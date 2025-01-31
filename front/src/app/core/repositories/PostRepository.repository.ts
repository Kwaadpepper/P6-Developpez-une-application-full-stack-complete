import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { first } from 'rxjs'
import { environment } from '../../../environments/environment'
import Post from '../interfaces/Post.interface'
import { pageOf } from '../services/api/schemas/PageOf.schema'
import postSchema from '../services/api/schemas/Post.schema'
import { verifyResponseType } from '../tools/verifyReponseType'
import PageOf from '../types/pageOf.type'
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
