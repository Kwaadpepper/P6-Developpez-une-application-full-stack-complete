import { computed, Injectable, signal } from '@angular/core'

import { Post } from '@core/interfaces'
import { PostRepository } from '@core/repositories'
import { PageOf } from '@core/types'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [PostRepository],
})
export class FeedService {
  private _feedInvalidated = signal<boolean>(false)
  public readonly feedInvalidated = computed(() => this._feedInvalidated())

  constructor(
    private postRepository: PostRepository,
  ) { }

  getUserFeedPage(pageNumber: number, ascending = false): Observable<PageOf<Post>> {
    const page = Math.max(1, pageNumber)
    this._feedInvalidated.set(false)

    return this.postRepository.getCurrentUserFeed(page, ascending)
  }

  invalidateFeed(): void {
    this._feedInvalidated.set(true)
  }
}
