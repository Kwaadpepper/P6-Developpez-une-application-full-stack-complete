import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { commentSchema, CommentZod, pageOf } from '@core/api/schemas'
import { Comment } from '@core/interfaces'
import { checkServerReponse } from '@core/tools/checkServerReponse'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { PageOf } from '@core/types'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export class CommentsRepository {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly commentsUrl = `${this.mddEndpointUrl}/api/comments`
  private readonly postsUrl = `${this.mddEndpointUrl}/api/posts`

  private constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Paginates the comments for a post
   * @param postUuid The UUID of the post to get the comments for.
   * @param page The page number to get. The first page is 1.
   * @param perPage The number of comments per page. Default is 30.
   * @returns An observable of the paginated comments.
   */
  public getPostsComments(postUuid: string, page: number, perPage?: number): Observable<PageOf<Comment>> {
    const commentsUrl = new URL(this.getPostsCommentsUrl(postUuid))
    commentsUrl.searchParams.append('page', String(page))

    if (perPage) {
      commentsUrl.searchParams.append('per-page', String(perPage))
    }

    return this.http.get<PageOf<Comment>>(commentsUrl.toString(), {
      withCredentials: true,
    }).pipe(
      verifyResponseType(pageOf(commentSchema)),
      retryMultipleTimes(),
    )
  }

  /**
   * Adds a comment to a post
   * @param postUuid The UUID of the post to add the comment to.
   * @param content The comment to add.
   * @returns An observable of the added comment.
   */
  public addComment(postUuid: string, content: string): Observable<Comment> {
    return this.http.post<CommentZod>(
      this.commentsUrl, {
        post: postUuid,
        content,
      }, {
        withCredentials: true,
      }).pipe(
      checkServerReponse(),
      verifyResponseType(commentSchema),
      retryMultipleTimes(),
    )
  }

  private getPostsCommentsUrl(postUuid: string): string {
    return `${this.postsUrl}/${postUuid}/comments`
  }
}
