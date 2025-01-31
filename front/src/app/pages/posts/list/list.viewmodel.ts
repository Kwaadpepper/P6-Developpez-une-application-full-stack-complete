import { computed, Injectable, signal } from '@angular/core'

import { Post } from '@core/interfaces'
import { FeedService } from '@core/services'

@Injectable()
export default class ListViewModel {
  private currentPage = 0
  private postList = signal<Post[]>([])

  public readonly currentPage$ = computed(() => this.currentPage)
  public readonly postList$ = computed(() => this.postList())
  public readonly sortAscending$ = signal(false)

  public readonly loading = signal(false)

  constructor(
    private feedService: FeedService,
  ) {
  }

  public feedUserWithMorePosts(): void {
    this.loading.set(true)
    this.currentPage += 1
    this.feedService.getUserFeedPage(this.currentPage, this.sortAscending$())
      .then((newPage) => {
        this.postList.update(posts => [...posts, ...newPage.list])
      }).finally(() => {
        this.loading.set(false)
      })
  }

  public togglePostsSorting(): void {
    this.sortAscending$.set(!this.sortAscending$())
    this.currentPage = 0
    this.postList.set([])
    this.feedUserWithMorePosts()
  }
}
