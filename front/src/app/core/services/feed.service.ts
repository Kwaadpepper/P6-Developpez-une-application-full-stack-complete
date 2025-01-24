import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'
import { cloneDeep } from 'lodash-es'
import { BehaviorSubject, catchError, Observable, retry, tap, throwError } from 'rxjs'

import Post from '../models/Post.type'

@Injectable({
  providedIn: 'root',
})
export class FeedService implements OnDestroy {
  // * Unique source of data for now
  private postsUrl = 'http://mddapi.test:3001/api/posts'
  // * Olympic countries fetcher
  private postList$ = new BehaviorSubject<Post[]>([])

  constructor(
    private http: HttpClient,
  ) { }

  ngOnDestroy(): void {
    this.postList$.next([])
  }

  /** Attempt to load olympic countries from server */
  loadInitialData(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(
        tap((value) => {
          const posts = (value as never as { posts: never }).posts as Post[]
          this.postList$.next(cloneDeep(posts.map((post) => {
            post.created_at = new Date(post.created_at)
            post.updated_at = post.updated_at ? new Date(post.updated_at) : undefined
            return post
          })))
        }),

        retry(3),
        catchError(() => {
          const message = 'Error while fetching feed from server'
          this.postList$.next([])
          this.postList$.error(message)
          return throwError(() => new Error(message))
        }),
      )
  }

  /** Get the feed list */
  getFeedList(): Observable<Post[]> {
    return this.postList$.asObservable()
  }
}
