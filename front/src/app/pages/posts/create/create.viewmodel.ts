import { computed, Injectable, signal } from '@angular/core'

import { Post } from '@core/interfaces'
import { FeedService } from '@core/services'

@Injectable()
export default class CreateViewModel {
  private currentPage = 0
  private postList = signal<Post[]>([])

  public readonly currentPage$ = computed(() => this.currentPage)
  public readonly postList$ = computed(() => this.postList())
  public readonly sortAscending$ = signal(false)

  constructor(
    private feedService: FeedService,
  ) {
  }
}
