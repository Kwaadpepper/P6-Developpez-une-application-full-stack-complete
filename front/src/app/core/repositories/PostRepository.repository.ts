import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { checkServerReponse } from '@core/tools/checkServerReponse'
import { Observable } from 'rxjs'

import CreatePost from '@core/api/requests/createPost.request'
import { pageOf, postSchema, PostZod } from '@core/api/schemas'
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
  public getCurrentUserFeed(page: number, ascending = false): Observable<PageOf<Post>> {
    const feedUrl = new URL(this.feedUrl)
    feedUrl.searchParams.append('page', String(page))
    feedUrl.searchParams.append('ascending', ascending ? 'true' : 'false')

    return this.http.get<PageOf<Post>>(feedUrl.toString(), {
      withCredentials: true,
    }).pipe(
      verifyResponseType(pageOf(postSchema)),
      retryMultipleTimes(),
    )
  }

  /**
   * Create a post.
   * @param create  The post to create.
   * @returns The created post.
   */
  public createPost(create: CreatePost): Observable<Post> {
    return this.http.post<PostZod>(
      this.postsUrl,
      create,
      {
        withCredentials: true,
      },
    ).pipe(
      checkServerReponse(),
      verifyResponseType(postSchema),
      retryMultipleTimes(),
    )
  }

  /**
   * Find a post by its slug.
   *
   * @param slug The slug of the post to find.
   * @returns The post with the given slug.
   */
  public findPostBySlug(slug: string): Observable<Post> {
    return this.http.get<PostZod>(
      `${this.postsUrl}/${slug}`,
      {
        withCredentials: true,
      },
    ).pipe(
      verifyResponseType(postSchema),
    )
  }
}
