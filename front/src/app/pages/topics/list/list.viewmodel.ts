import { computed, Injectable, signal } from '@angular/core'
import { finalize, map, Observable, tap } from 'rxjs'

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
  private _topicNameFilter: string | undefined = undefined
  private _currentPage = 0
  private topicList = signal<TopicListElement[]>([])

  public readonly currentPage = computed(() => this._currentPage)
  public readonly topics = computed(() => this.topicList())

  public readonly loading = signal(false)

  constructor(
    private topicService: TopicService,
  ) {
  }

  public reloadTopics(): Observable<void> {
    this._currentPage = 1
    this.topicList.set([])
    return this.loadMoreTopics()
  }

  public setSetTopicNameFilter(name: string | undefined): void {
    this._topicNameFilter = name
  }

  public loadMoreTopics(): Observable<void> {
    this.loading.set(true)
    return this.topicService.paginateTopics(this._currentPage++, this._topicNameFilter)
      .pipe(
        tap((newPage) => {
          this.topicList.update(topics => [...topics, ...newPage.list.map(topic => ({
            uuid: topic.uuid,
            description: topic.description,
            name: topic.name,
            subscribed: topic.subscribed,
          }))])
        }),
        map(() => { return }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
  }
}
