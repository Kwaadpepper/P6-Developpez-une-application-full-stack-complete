import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { first, Observable } from 'rxjs'

import { pageOf, simpleMessageSchema, SimpleMessageZod, topicNameSchema, topicSchema } from '@core/api/schemas'
import { Topic, TopicName } from '@core/interfaces'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { PageOf, UUID } from '@core/types'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export default class TopicRepository {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly topicUrl = `${this.mddEndpointUrl}/api/topics`
  private readonly topicSubscriptionUrl = `${this.topicUrl}/subscription`

  private constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Paginate all topics.
   * @param page The page number to get. The first page is 1.
   * @returns A topic list page.
   */
  public getTopics(page: number): Observable<PageOf<Topic>> {
    const topicUrl = new URL(this.topicUrl)
    topicUrl.searchParams.append('page', String(page))

    return this.http.get<PageOf<Topic>>(topicUrl.toString(), {
      withCredentials: true,
    }).pipe(
      verifyResponseType(pageOf(topicSchema)),
      retryMultipleTimes(),
      first(),
    )
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
  ): Observable<PageOf<TopicName>> {
    const topicUrl = new URL(`${this.topicUrl}/names`)
    topicUrl.searchParams.append('page', String(page))

    if (searchLike) {
      topicUrl.searchParams.append('name', searchLike)
    }

    return this.http.get<PageOf<TopicName>>(topicUrl.toString(), {
      withCredentials: true,
    }).pipe(
      verifyResponseType(pageOf(topicNameSchema)),
      retryMultipleTimes(),
      first(),
    )
  }

  /**
   * Paginate user subscribed topics.
  * @param page The page number to get. The first page is 1.
   * @returns A page of user subscribed topics.
   */
  public getUserSubscribedTopics(page: number): Observable<PageOf<Topic>> {
    const userTopicsUrl = new URL(`${this.topicUrl}/me`)
    userTopicsUrl.searchParams.append('page', String(page))

    return this.http.get<PageOf<Topic>>(userTopicsUrl.toString(), {
      withCredentials: true,
    }).pipe(
      verifyResponseType(pageOf(topicSchema)),
      retryMultipleTimes(),
      first(),
    )
  }

  /**
   * Subscribe to a topic.
   * @param topicUuid The topic UUID to subscribe to.
   * @returns A message indicating the success of the operation.
   */
  public subscribeTo(topicUuid: UUID): Observable<SimpleMessageZod> {
    const subscribeUrl = new URL(this.topicSubscriptionUrl)

    return this.http.post<void>(subscribeUrl.toString(), {
      topic: topicUuid,
    }, {
      withCredentials: true,
    }).pipe(
      verifyResponseType(simpleMessageSchema),
      retryMultipleTimes(),
      first(),
    )
  }

  /**
   * Unsubscribe from a topic.
   * @param topicUuid The topic UUID to unsubscribe from.
   * @returns A message indicating the success of the operation.
   */
  public unsubscribeFrom(topicUuid: UUID): Observable<SimpleMessageZod> {
    const unsubscribeUrl = new URL(this.topicSubscriptionUrl)

    return this.http.delete<void>(unsubscribeUrl.toString(), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        topic: topicUuid,
      },
    }).pipe(
      verifyResponseType(simpleMessageSchema),
      retryMultipleTimes(),
      first(),
    )
  }
}
