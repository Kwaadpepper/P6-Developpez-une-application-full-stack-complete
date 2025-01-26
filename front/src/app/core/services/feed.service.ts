import { Injectable } from '@angular/core'

import Post from '../models/Post.type'
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

  getUserFeedPage(pageNumber: number): Promise<PageOf<Post>> {
    const page = Math.max(0, pageNumber)

    return this.postRepository.getCurrentUserFeed(page)
  }
}
