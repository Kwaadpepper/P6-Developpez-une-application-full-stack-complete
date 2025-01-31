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

  constructor(
    private feedService: FeedService,
  ) {
  }

  public async feedUserWithMorePosts(): Promise<void> {
    this.currentPage += 1
    const newPage = await this.feedService.getUserFeedPage(this.currentPage, this.sortAscending$())
    const currentPostList = this.postList()

    this.postList.set(currentPostList.concat(newPage.list))
  }

  public togglePostsSorting(): void {
    this.sortAscending$.set(!this.sortAscending$())
    this.currentPage = 0
    this.postList.set([])
    this.feedUserWithMorePosts()
  }
}
