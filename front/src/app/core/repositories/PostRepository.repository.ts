import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { first } from 'rxjs'

import { pageOf } from '@core/api/schemas/PageOf.schema'
import postSchema from '@core/api/schemas/Post.schema'
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

  private constructor(
    private http: HttpClient,
  ) {
  }

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
}
