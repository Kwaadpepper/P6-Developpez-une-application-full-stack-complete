import { Injectable } from '@angular/core'

import { Post } from '@core/interfaces'
import { PostRepository } from '@core/repositories'
import { PageOf } from '@core/types'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [PostRepository],
})
export class FeedService {
  constructor(
    private postRepository: PostRepository,
  ) { }

  getUserFeedPage(pageNumber: number, ascending = false): Observable<PageOf<Post>> {
    const page = Math.max(1, pageNumber)

    return this.postRepository.getCurrentUserFeed(page, ascending)
  }
}
