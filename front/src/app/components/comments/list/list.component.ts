import { NgFor, NgIf } from '@angular/common'
import { Component, EventEmitter, input, OnDestroy, OnInit } from '@angular/core'
import { MarkdownModule } from 'ngx-markdown'
import { PaginatorModule, PaginatorState } from 'primeng/paginator'
import { filter, map, Observable, Subject, switchMap, takeUntil } from 'rxjs'

import { UUID } from '@core/types'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list-comments',
  imports: [
    NgFor, NgIf,
    MarkdownModule,
    PaginatorModule,
  ],
  providers: [ListViewModel],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  readonly postUuid = input.required<UUID>()
  readonly reloadComments = input.required<EventEmitter<UUID | void>>()

  private readonly endObservables = new Subject<true>()

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
  }

  ngOnInit(): void {
    this.loadFirstPageComments()
      .pipe(takeUntil(this.endObservables))
      .subscribe()

    this.reloadComments()
      .pipe(
        takeUntil(this.endObservables),
        // * Reload comments when asked to
        switchMap((newCommentUuid) => {
          return this.loadFirstPageComments()
            .pipe(
              map(() => newCommentUuid),
            )
        }),
        // * Only scroll to the new comment if it's a string
        filter(newCommentUuid => typeof newCommentUuid === 'string'),
      )
      .subscribe({
        next: (newCommentUuid) => {
          // * Scroll to the new comment
          setTimeout(() => {
            document.getElementById(`comment-${newCommentUuid}`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }, 300)
        },
      })
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  onPageChange(event: PaginatorState): void {
    this.viewModel.fetchComments(
      this.postUuid(),
      (event.page ?? 0) + 1, event.rows ?? this.viewModel.perPage(),
    ).pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  private loadFirstPageComments(): Observable<void> {
    return this.viewModel.fetchComments(this.postUuid(), 1, this.viewModel.perPage())
  }
}
