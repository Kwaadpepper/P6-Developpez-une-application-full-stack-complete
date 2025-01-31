import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { checkServerReponse } from '@core/tools/checkServerReponse'
import { first } from 'rxjs'

import CreatePost from '@core/api/requests/createPost.request'
import { pageOf, postSchema, simpleMessageSchema, SimpleMessageZod } from '@core/api/schemas'
import { Post } from '@core/interfaces'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { PageOf } from '@core/types'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export default class PostRepository {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly feedUrl = `${this.mddEndpointUrl}/api/feed`
  private readonly postsUrl = `${this.mddEndpointUrl}/api/posts`

  private constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get the current user feed.
   * @param page The page number to get. The first page is 1.
   * @param ascending If true, the oldest post will be the first.
   * @returns The current user feed.
   */
  public getCurrentUserFeed(page: number, ascending = false): Promise<PageOf<Post>> {
    const feedUrl = new URL(this.feedUrl)
    feedUrl.searchParams.append('page', String(page))
    feedUrl.searchParams.append('ascending', ascending ? 'true' : 'false')

    return new Promise<PageOf<Post>>((resolve, reject) => {
      this.http.get<PageOf<Post>>(feedUrl.toString(), {
        withCredentials: true,
      }).pipe(
        verifyResponseType(pageOf(postSchema)),
        retryMultipleTimes(),
        first(),
      ).subscribe({
        next: (pageOfPosts) => {
          resolve(pageOfPosts)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }

  /**
   * Create a post.
   * @param create  The post to create.
   * @returns The created post.
   */
  public createPost(create: CreatePost): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<SimpleMessageZod>(
        this.postsUrl,
        create,
        {
          withCredentials: true,
        },
      ).pipe(
        checkServerReponse(),
        verifyResponseType(simpleMessageSchema),
        retryMultipleTimes(),
        first(),
      ).subscribe({
        next: () => {
          resolve(true)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }
}
