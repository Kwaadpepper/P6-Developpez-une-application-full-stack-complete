import { NgFor, NgIf } from '@angular/common'
import { Component, effect, EventEmitter, input, OnInit } from '@angular/core'
import { MarkdownModule } from 'ngx-markdown'
import { PaginatorModule, PaginatorState } from 'primeng/paginator'

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
export class ListComponent implements OnInit {
  readonly postUuid = input.required<UUID>()
  readonly reloadComments = input.required<EventEmitter<UUID | void>>()

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
    effect(() => {
      this.reloadComments().subscribe({
        next: (newCommentUuid: UUID) => {
          this.loadFirstPageComments().then(() => {
            setTimeout(() => {
              console.log(document.getElementById(`comment-${newCommentUuid}`))
              document.getElementById(`comment-${newCommentUuid}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            })
          })
        },
      })
    })
  }

  ngOnInit(): void {
    this.loadFirstPageComments()
  }

  onPageChange(event: PaginatorState): void {
    console.log(event)
    this.viewModel.fetchComments(this.postUuid(), (event.page ?? 0) + 1, event.rows ?? this.viewModel.perPage())
  }

  private loadFirstPageComments(): Promise<void> {
    return this.viewModel.fetchComments(this.postUuid(), 1, this.viewModel.perPage())
  }
}
