import { Injectable } from '@angular/core'

import Post from '../interfaces/Post.interface'
import PostRepository from '../repositories/PostRepository.repository'
import PageOf from '../types/pageOf.type'

@Injectable({
  providedIn: 'root',
  deps: [PostRepository],
})
export class FeedService {
  constructor(
    private postRepository: PostRepository,
  ) { }

  getUserFeedPage(pageNumber: number, ascending = false): Promise<PageOf<Post>> {
    const page = Math.max(0, pageNumber)

    return this.postRepository.getCurrentUserFeed(page, ascending)
  }
}
