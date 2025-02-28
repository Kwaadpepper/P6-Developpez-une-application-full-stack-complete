import { Injectable } from '@angular/core'

import { Post, TopicName } from '@core/interfaces'
import { PostRepository } from '@core/repositories'
import { map, Observable } from 'rxjs'

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
  public createPost(title: string, content: string, topicName: TopicName): Observable<string> {
    return this.postRepository.createPost({
      title,
      content,
      topic: topicName.uuid,
    }).pipe(
      map(post => post.slug),
    )
  }

  /**
   * Find a post by its slug.
   * @param slug The slug of the post.
   * @returns The post.
   */
  public findPostBySlug(slug: string): Observable<Post> {
    return this.postRepository.findPostBySlug(slug)
  }
}
