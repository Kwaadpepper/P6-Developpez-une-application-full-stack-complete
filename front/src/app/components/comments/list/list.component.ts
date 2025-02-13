import { NgFor } from '@angular/common'
import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core'
import { UUID } from '@core/types'
import { MarkdownModule } from 'ngx-markdown'
import { Subscription } from 'rxjs'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list-comments',
  imports: [
    NgFor,
    MarkdownModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  postUuid!: UUID

  @Input({ required: true })
  reloadComments!: EventEmitter<void>

  private reloadSubscription!: Subscription

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
  }

  ngOnInit(): void {
    this.viewModel.reloadComments(this.postUuid)

    this.reloadSubscription = this.reloadComments.subscribe(() => {
      this.viewModel.reloadComments(this.postUuid)
    })
  }

  ngOnDestroy(): void {
    this.reloadSubscription.unsubscribe()
  }
}
