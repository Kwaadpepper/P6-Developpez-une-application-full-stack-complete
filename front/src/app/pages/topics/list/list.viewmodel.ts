import { computed, Injectable, signal } from '@angular/core'

import { TopicService } from '@core/services'
import { UUID } from '@core/types'

interface TopicListElement {
  uuid: UUID
  description: string
  name: string
  subscribed: boolean
}

@Injectable({
  providedIn: 'root',
  deps: [TopicService],
})
export default class ListViewModel {
  private _currentPage = 0
  private topicList = signal<TopicListElement[]>([])

  public readonly currentPage = computed(() => this._currentPage)
  public readonly topics = computed(() => this.topicList())

  public readonly loading = signal(false)

  constructor(
    private topicService: TopicService,
  ) {
  }

  public reloadTopics(): void {
    this._currentPage = 1
    this.topicList.set([])
    this.loadMoreTopics()
  }

  public loadMoreTopics(): void {
    this.loading.set(true)
    this.topicService.paginateTopics(this._currentPage++)
      .subscribe({
        next: (newPage) => {
          this.topicList.update(topics => [...topics, ...newPage.list.map(topic => ({
            uuid: topic.uuid,
            description: topic.description,
            name: topic.name,
            subscribed: topic.subscribed,
          }))])
        },
        complete: () => {
          this.loading.set(false)
        },
      })
  }
}
