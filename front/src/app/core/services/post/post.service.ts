import { Injectable } from '@angular/core'

import { Post, TopicName } from '@core/interfaces'
import { PostRepository } from '@core/repositories'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private postRepository: PostRepository,
  ) { }

  /**
   * Create a new post.
   * @param title     The title of the post.
   * @param content   The content of the post.
   * @param topicName The topic of the post.
   * @returns The slug of the created post.
   */
  public async createPost(title: string, content: string, topicName: TopicName): Promise<string> {
    const post = await this.postRepository.createPost({
      title,
      content,
      topic: topicName.uuid,
    })

    return post.slug
  }

  public findPostBySlug(slug: string): Promise<Post> {
    return this.postRepository.findPostBySlug(slug)
  }
}
