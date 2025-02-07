import { computed, Injectable, signal } from '@angular/core'

import { Topic } from '@core/interfaces'
import { TopicService } from '@core/services'
import { UUID } from '@core/types'
import { Subscription } from 'rxjs'

@Injectable()
export default class ListViewModel {
  private currentPage = 0
  private topicList = signal<Topic[]>([])

  public readonly currentPage$ = computed(() => this.currentPage)
  public readonly topicList$ = computed(() => this.topicList())
  public readonly sortAscending$ = signal(false)

  public readonly loading = signal(false)

  constructor(
    private topicService: TopicService,
  ) {
  }

  public reloadTopics(): void {
    this.currentPage = 1
    this.topicList.set([])
    this.loadMoreTopics()
  }

  public loadMoreTopics(): void {
    this.loading.set(true)
    this.currentPage += 1
    this.topicService.paginateTopics(this.currentPage)
      .subscribe({
        next: (newPage) => {
          this.topicList.update(topics => [...topics, ...newPage.list])
        },
        complete: () => {
          this.loading.set(false)
        },
      })
  }

  public subscribeTo(topicUuid: UUID): Subscription {
    return this.topicService.subcribeToTopic(topicUuid)
      .subscribe({
        next: () => {
          this.reloadTopics()
        },
        error: (error) => {
          console.error('Error:', error)
        },
      })
  }
}
