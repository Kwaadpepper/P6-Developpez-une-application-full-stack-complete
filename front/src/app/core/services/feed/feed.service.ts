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

  /**
   * Get the user feed page.
   * @param pageNumber The page number to get. The first page is 1.
   * @param ascending If true, the oldest post will be the first.
   * @returns The user feed page.
   */
  getUserFeedPage(pageNumber: number, ascending = false): Observable<PageOf<Post>> {
    const page = Math.max(1, pageNumber)
    this._feedInvalidated.set(false)

    return this.postRepository.getCurrentUserFeed(page, ascending)
  }

  /**
   * Invalidate the feed so that it will be reloaded.
   */
  invalidateFeed(): void {
    this._feedInvalidated.set(true)
  }
}
