import { Injectable } from '@angular/core'

import { Topic, TopicName } from '@core/interfaces'
import { TopicRepository } from '@core/repositories'
import { PageOf } from '@core/types'

@Injectable({
  providedIn: 'root',
  deps: [TopicRepository],
})
export class TopicService {
  constructor(
    private topicRepository: TopicRepository,
  ) { }

  paginateTopics(pageNumber: number): Promise<PageOf<Topic>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopics(page)
  }

  paginateTopicsNames(
    pageNumber: number,
    searchLike: string | undefined = undefined,
  ): Promise<PageOf<TopicName>> {
    const page = Math.max(1, pageNumber)

    return this.topicRepository.getTopicsNames(page, searchLike)
  }
}
