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
  private readonly _perPages = [5, 10, 20, 30]
  private _comments = signal<Comment[]>([])
  private _perPage = signal(10)
  private _page = signal(1)
  private _totalItems = signal(1)

  public readonly firstItemIndex = computed(() => Math.max(0, (this._page() - 1) * this._perPage()))
  public readonly perPage = computed(() => this._perPage())
  public readonly perPages = computed(() => this._perPages)
  public readonly page = computed(() => this._page())
  public readonly comments = computed(() => this._comments())
  public readonly totalItems = computed(() => this._totalItems())

  constructor(
    private CommentService: CommentService,
  ) {
  }

  public fetchComments(postUuid: UUID, page: number, perPage: number): Promise<void> {
    this._perPage.set(perPage)

    return new Promise<void>((resolve, reject) => {
      this.CommentService.paginatePostsComments(postUuid, page, perPage)
        .subscribe({
          next: (comments) => {
            const commentsPage = comments.list.map(comment => ({
              uuid: comment.uuid,
              username: comment.author_name,
              content: comment.content,
            }))

            this._comments.set(commentsPage)
            this._totalItems.set(comments.totalItems)
            this._page.set(comments.page)
            resolve()
          },
          error: (error) => {
            console.error(error)
            reject(error)
          },
        })
    })
  }
}
