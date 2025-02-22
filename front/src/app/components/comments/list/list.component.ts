import { NgFor } from '@angular/common'
import { Component, effect, EventEmitter, input, OnInit } from '@angular/core'
import { UUID } from '@core/types'
import { MarkdownModule } from 'ngx-markdown'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list-comments',
  imports: [
    NgFor,
    MarkdownModule,
  ],
  providers: [ListViewModel],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  postUuid = input.required<UUID>()
  reloadComments = input.required<EventEmitter<void>>()

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
    effect(() => {
      this.reloadComments().subscribe(() => {
        this.viewModel.fetchComments(this.postUuid())
      })
    })
  }

  ngOnInit(): void {
    this.viewModel.fetchComments(this.postUuid())
  }
}
