import { Injectable } from '@angular/core'

import { Topic, TopicName, TopicWithSubscription } from '@core/interfaces'
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

  /**
   * Get the topics page.
   * @param pageNumber The page number to get. The first page is 1.
   * @param searchLike The search string to filter the topics.
   * @returns The topics page.
   */
  paginateTopics(
    pageNumber: number,
    searchLike: string | undefined = undefined,
  ): Observable<PageOf<TopicWithSubscription>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopics(page, searchLike)
  }

  /**
   * Get the topics names page.
   * @param pageNumber The page number to get. The first page is 1.
   * @param searchLike The search string to filter the topics.
   * @returns The topics names page.
   */
  paginateTopicsNames(
    pageNumber: number,
    searchLike: string | undefined = undefined,
  ): Observable<PageOf<TopicName>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopicsNames(page, searchLike)
  }

  /**
   * Get the current user topics.
   * @param pageNumber The page number to get. The first page is 1.
   * @returns The current user topics.
   */
  getCurrentUserTopics(pageNumber: number): Observable<PageOf<Topic>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getUserSubscribedTopics(page)
  }

  /**
   * Get the topic by its UUID.
   * @param topicUuid The UUID of the topic to get.
   * @returns The topic.
   */
  subcribeToTopic(topicUuid: UUID): Observable<void> {
    return this.topicRepository.subscribeTo(topicUuid).pipe(
      map(() => { return }),
    )
  }

  /**
   * Unsubscribe from a topic.
   * @param topicUuid The UUID of the topic to unsubscribe from.
   * @returns An observable that completes when the operation is done.
   */
  unSubcribeFromTopic(topicUuid: UUID): Observable<void> {
    return this.topicRepository.unsubscribeFrom(topicUuid).pipe(
      map(() => { return }),
    )
  }
}
