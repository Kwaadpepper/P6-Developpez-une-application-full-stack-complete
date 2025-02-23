import { Injectable } from '@angular/core'

import { Comment } from '@core/interfaces'
import { CommentsRepository } from '@core/repositories'
import { PageOf, UUID } from '@core/types'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [CommentsRepository],
})
export class CommentService {
  constructor(
    private commentsRepository: CommentsRepository,
  ) { }

  /**
   * Paginates the comments for a post
   *
   * @param postUuid The UUID of the post to get the comments for.
   * @param pageNumber The page number to get. The first page is 1.
   * @param perPage The number of comments per page. Default is 30.
   * @returns An observable of the paginated comments.
   */
  paginatePostsComments(postUuid: UUID, pageNumber: number, perPage?: number): Observable<PageOf<Comment>> {
    const page = Math.max(1, pageNumber)
    const _perPage = perPage ? Math.max(1, Math.min(30, perPage)) : perPage

    return this.commentsRepository.getPostsComments(postUuid, page, _perPage)
  }

  /**
   * Adds a comment to a post
   *
   * @param postUuid The UUID of the post to add the comment to.
   * @param content The comment to add.
   * @returns An observable of the added comment.
   */
  public createComment(postUuid: UUID, content: string): Observable<Comment> {
    return this.commentsRepository.addComment(postUuid, content)
  }
}
