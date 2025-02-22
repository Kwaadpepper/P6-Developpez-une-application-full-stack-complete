import { computed, Injectable, signal } from '@angular/core'
import { CommentService } from '@core/services/comment/comment.service'
import { UUID } from '@core/types'

interface Comment {
  uuid: UUID
  username: string
  content: string
}

@Injectable({
  providedIn: 'root',
  deps: [CommentService],
})
export default class ListViewModel {
  private readonly _comments = signal<Comment[]>([])

  public readonly comments = computed(() => this._comments())

  constructor(
    private CommentService: CommentService,
  ) {
  }

  public fetchComments(postUuid: UUID): void {
    this.CommentService.paginatePostsComments(postUuid, 1).subscribe((comments) => {
      const commentsPage = comments.list.map(comment => ({
        uuid: comment.uuid,
        username: comment.author_name,
        content: comment.content,
      }))

      this._comments.set(commentsPage)
    })
  }
}
