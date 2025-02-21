import { Injectable } from '@angular/core'

import { Comment } from '@core/interfaces'
import { CommentsRepository } from '@core/repositories'
import { PageOf, UUID } from '@core/types'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [CommentsRepository],
})
export class CommentService {
  constructor(
    private commentsRepository: CommentsRepository,
  ) { }

  paginatePostsComments(postUuid: UUID, pageNumber: number): Observable<PageOf<Comment>> {
    const page = Math.max(1, pageNumber)

    return this.commentsRepository.getPostsComments(postUuid, page)
  }

  public createComment(postUuid: UUID, content: string): Observable<void> {
    return this.commentsRepository.addComment(postUuid, content)
      .pipe(
        map(() => { return }),
      )
  }
}
