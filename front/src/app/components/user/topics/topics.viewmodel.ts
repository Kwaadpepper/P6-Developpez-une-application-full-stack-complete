import { Injectable, signal } from '@angular/core'
import { Topic } from '@core/interfaces'
import { ToastService, TopicService } from '@core/services'
import { UUID } from '@core/types'
import { catchError, EMPTY, finalize, map } from 'rxjs'

type TopicElement = Topic & {
  subscribed: boolean
}

@Injectable({
  providedIn: 'root',
  deps: [TopicService, ToastService],
})
export default class TopicsViewModel {
  public readonly loading = signal(false)
  public readonly userTopics = signal<TopicElement[]>([])

  private readonly currentPage = signal(1)

  constructor(
    private readonly topicService: TopicService,
    private readonly toastService: ToastService,
  ) {
  }

  /** Load user topics starting from the first page */
  reloadUserTopics(): void {
    this.currentPage.set(1)
    this.userTopics.set([])
    this.loadUserTopics()
  }

  loadMoreUserTopics(): void {
    this.currentPage.update(current => current + 1)
    this.loadUserTopics()
  }

  unsbuscribeFrom(topicUuid: UUID): void {
    this.topicService.unSubcribeFromTopic(topicUuid)
      .subscribe({
        next: () => {
          this.toastService.success('Désinscription réussie')
          this.reloadUserTopics()
        },
        error: (error) => {
          console.error('Error:', error)
          this.toastService.error('Erreur lors de la désinscription')
        },
      })
  }

  private loadUserTopics(): void {
    this.loading.set(true)
    this.topicService.getCurrentUserTopics(this.currentPage())
      .pipe(
        map(paginatedTopics => paginatedTopics.list),
        catchError((error) => {
          console.error('Error:', error)
          this.toastService.error('Erreur lors de la récupération des topics')
          return EMPTY
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (topics) => {
          this.userTopics.update(current => [...current, ...topics.map(topic => ({
            ...topic,
            subscribed: true,
          }))])
        },
      })
  }
}
