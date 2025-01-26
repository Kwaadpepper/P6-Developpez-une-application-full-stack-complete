import { computed, Injectable, signal } from '@angular/core'
import Post from '../../../core/models/Post.type'
import { FeedService } from '../../../core/services'

@Injectable()
export default class ListPostsViewModel {
  private currentPage = 0
  private postList = signal<Post[]>([])

  public readonly currentPage$ = computed(() => this.currentPage)
  public readonly postList$ = computed(() => this.postList())

  constructor(
    private feedService: FeedService,
  ) {
  }

  public async feedUserWithMorePosts(): Promise<void> {
    this.currentPage += 1
    const newPage = await this.feedService.getUserFeedPage(this.currentPage)
    const currentPostList = this.postList()

    this.postList.set(currentPostList.concat(newPage.list))
  }
}
