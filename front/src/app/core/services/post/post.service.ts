import { Injectable } from '@angular/core'

import { TopicName } from '@core/interfaces'
import { PostRepository } from '@core/repositories'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private postRepository: PostRepository,
  ) { }

  public createPost(title: string, content: string, topicName: TopicName): Promise<boolean> {
    return this.postRepository.createPost({
      title,
      content,
      topic: topicName.uuid,
    })
  }
}
