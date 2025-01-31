import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { first } from 'rxjs'

import { pageOf, topicNameSchema, topicSchema } from '@core/api/schemas'
import { Topic, TopicName } from '@core/interfaces'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { PageOf } from '@core/types'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export default class TopicRepository {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly topicUrl = `${this.mddEndpointUrl}/api/topics`

  private constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Paginate all topics.
   * @param page The page number to get. The first page is 1.
   * @returns A topic list page.
   */
  public getTopics(page: number): Promise<PageOf<Topic>> {
    const topicUrl = new URL(this.topicUrl)
    topicUrl.searchParams.append('page', String(page))

    return new Promise<PageOf<Topic>>((resolve, reject) => {
      this.http.get<PageOf<Topic>>(topicUrl.toString(), {
        withCredentials: true,
      }).pipe(
        verifyResponseType(pageOf(topicSchema)),
        retryMultipleTimes(),
        first(),
      ).subscribe({
        next: (pageOfTopics) => {
          resolve(pageOfTopics)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }

  /**
   * Paginate all topics names.
   * @param page The page number to get. The first page is 1.
   * @param searchLike A string to search for in the topic names.
   * @returns A page of topic names and uuids.
   */
  public getTopicsNames(
    page: number,
    searchLike: string | undefined = undefined,
  ): Promise<PageOf<TopicName>> {
    const topicUrl = new URL(`${this.topicUrl}/names`)
    topicUrl.searchParams.append('page', String(page))

    if (searchLike) {
      topicUrl.searchParams.append('name', searchLike)
    }

    return new Promise<PageOf<TopicName>>((resolve, reject) => {
      this.http.get<PageOf<TopicName>>(topicUrl.toString(), {
        withCredentials: true,
      }).pipe(
        verifyResponseType(pageOf(topicNameSchema)),
        retryMultipleTimes(),
        first(),
      ).subscribe({
        next: (pageOfTopicsNames) => {
          resolve(pageOfTopicsNames)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }
}
