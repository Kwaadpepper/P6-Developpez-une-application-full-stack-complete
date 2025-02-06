import { Injectable } from '@angular/core'

import { Topic, TopicName } from '@core/interfaces'
import { TopicRepository } from '@core/repositories'
import { PageOf, UUID } from '@core/types'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [TopicRepository],
})
export class TopicService {
  constructor(
    private topicRepository: TopicRepository,
  ) { }

  paginateTopics(pageNumber: number): Observable<PageOf<Topic>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopics(page)
  }

  paginateTopicsNames(
    pageNumber: number,
    searchLike: string | undefined = undefined,
  ): Observable<PageOf<TopicName>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopicsNames(page, searchLike)
  }

  getCurrentUserTopics(pageNumber: number): Observable<PageOf<Topic>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getUserSubscribedTopics(page)
  }

  subcribeToTopic(topic: Topic): Observable<void> {
    return this.topicRepository.subscribeTo(topic).pipe(
      map(() => { return }),
    )
  }

  unSubcribeFromTopic(topicUuid: UUID): Observable<void> {
    return this.topicRepository.unsubscribeFrom(topicUuid).pipe(
      map(() => { return }),
    )
  }
}
