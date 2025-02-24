import { Injectable, signal } from '@angular/core'
import { catchError, EMPTY, finalize, map, Observable, tap } from 'rxjs'

import { CommentService, errors } from '@core/services'
import { UUID } from '@core/types'

@Injectable({
  providedIn: 'root',
  deps: [CommentService],
})
export default class AddViewModel {
  private postUuid = signal<UUID>('')

  public readonly formErrorMessage = signal('')
  public readonly errors = {
    content: signal(''),
  }

  public readonly loading = signal(false)
  public readonly content = signal('')

  constructor(
    private commentService: CommentService,
  ) {
  }

  public setPostUuid(postUuid: UUID): void {
    this.postUuid.set(postUuid)
  }

  public setComment(value: string): void {
    this.content.set(value)
  }

  public setErrorMessage(value: string): void {
    this.formErrorMessage.set(value)
  }

  private reset(): void {
    this.content.set('')
    this.resetErrors()
    this.formErrorMessage.set('')
  }

  public saveComment(): Observable<UUID> {
    this.resetErrors()
    this.setErrorMessage('')

    if (!this.content()) {
      this.setErrorMessage('Le commentaire ne peut pas être vide')
      return EMPTY
    }

    this.loading.set(true)

    return this.commentService
      .createComment(this.postUuid(), this.content())
      .pipe(
        tap(this.reset.bind(this)),
        map(v => v.uuid),
        catchError((error) => {
          if (error instanceof errors.ValidationError) {
            this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
            this.setErrors(error.getErrors())
            return EMPTY
          }

          this.formErrorMessage.set(error.message)
          return EMPTY
        }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
  }

  private resetErrors(): void {
    Object.values(this.errors).forEach((error) => {
      error.set('')
    })
  }

  private setErrors(errors: Map<string, string>): void {
    this.errors.content.set(errors.get('content') ?? '')
  }
}
