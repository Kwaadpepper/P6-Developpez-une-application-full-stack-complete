import { Injectable, signal } from '@angular/core'
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs'

import { Topic } from '@core/interfaces'
import { ToastService, TopicService } from '@core/services'

type TopicElement = Topic & {
  subscribed: boolean
}

@Injectable({
  providedIn: 'root',
  deps: [TopicService, ToastService],
})
export class TopicsViewModel {
  public readonly loading = signal(false)
  public readonly userTopics = signal<TopicElement[]>([])

  private readonly currentPage = signal(1)

  constructor(
    private readonly topicService: TopicService,
    private readonly toastService: ToastService,
  ) {
  }

  /** Load user topics starting from the first page */
  reloadUserTopics(): Observable<void> {
    this.currentPage.set(1)
    this.userTopics.set([])
    return this.loadUserTopics()
  }

  /** Load the next user topics page */
  loadMoreUserTopics(): Observable<void> {
    this.currentPage.update(current => current + 1)
    return this.loadUserTopics()
  }

  private loadUserTopics(): Observable<void> {
    this.loading.set(true)
    return this.topicService.getCurrentUserTopics(this.currentPage())
      .pipe(
        map(paginatedTopics => paginatedTopics.list),
        tap((topics) => {
          this.userTopics.update(current => [...current, ...topics.map(topic => ({
            ...topic,
            subscribed: true,
          }))])
          this.loading.set(false)
        }),
        map(() => { return }),
        catchError((error) => {
          console.error('Error:', error)
          this.toastService.error('Erreur lors de la récupération des topics')
          return EMPTY
        }),
        finalize(() => this.loading.set(false)),
      )
  }
}
