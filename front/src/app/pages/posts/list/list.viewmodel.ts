import { computed, Injectable, Signal, signal } from '@angular/core'
import { finalize, map, Observable, tap } from 'rxjs'

import { Post } from '@core/interfaces'
import { FeedService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [FeedService],
})
export default class ListViewModel {
  private _currentPage = 0
  private _postList = signal<Post[]>([])

  public readonly currentPage = computed(() => this._currentPage)
  public readonly posts = computed(() => this._postList())
  public readonly sortAscending = signal(false)
  public readonly loading = signal(false)
  public readonly feedInvalidated: Signal<boolean>

  constructor(
    private feedService: FeedService,
  ) {
    this.feedInvalidated = computed(() => feedService.feedInvalidated())
  }

  public feedUserWithMorePosts(): Observable<void> {
    this.loading.set(true)
    this._currentPage += 1
    return this.feedService.getUserFeedPage(this._currentPage, this.sortAscending())
      .pipe(
        tap((newPage) => {
          this._postList.update(posts => [...posts, ...newPage.list])
          this.loading.set(false)
        }),
        map(() => { return }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
  }

  public reloadPosts(): Observable<void> {
    this._currentPage = 0
    this._postList.set([])
    return this.feedUserWithMorePosts()
  }

  public togglePostsSorting(): Observable<void> {
    this.sortAscending.set(!this.sortAscending())
    return this.reloadPosts()
  }
}
