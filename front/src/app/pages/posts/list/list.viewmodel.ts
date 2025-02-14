import { computed, Injectable, signal } from '@angular/core'

import { Post } from '@core/interfaces'
import { FeedService } from '@core/services'

@Injectable()
export default class ListViewModel {
  private _currentPage = 0
  private _postList = signal<Post[]>([])

  public readonly currentPage = computed(() => this._currentPage)
  public readonly posts = computed(() => this._postList())
  public readonly sortAscending = signal(false)
  public readonly loading = signal(false)

  constructor(
    private feedService: FeedService,
  ) {
  }

  public feedUserWithMorePosts(): void {
    this.loading.set(true)
    this._currentPage += 1
    this.feedService.getUserFeedPage(this._currentPage, this.sortAscending())
      .subscribe({
        next: (newPage) => {
          this._postList.update(posts => [...posts, ...newPage.list])
        },
        complete: () => {
          this.loading.set(false)
        },
      })
  }

  public reloadPosts(): void {
    this._currentPage = 0
    this._postList.set([])
    this.feedUserWithMorePosts()
  }

  public togglePostsSorting(): void {
    this.sortAscending.set(!this.sortAscending())
    this._currentPage = 0
    this._postList.set([])
    this.feedUserWithMorePosts()
  }
}
