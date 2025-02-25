import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, EventEmitter } from '@angular/core'
import { MarkdownComponent } from 'ngx-markdown'

import { CommentAddComponent, CommentsListComponent } from '@components/index'
import { UUID } from '@core/types'
import { NiceDate } from '@pipes/NiceDate'
import { BackButtonComponent } from '@shared/index'
import ShowViewModel from './show.viewmodel'

@Component({
  selector: 'app-show-post',
  imports: [
    SlicePipe, TitleCasePipe,
    BackButtonComponent, NiceDate,
    MarkdownComponent,
    CommentsListComponent,
    CommentAddComponent,
  ],
  providers: [ShowViewModel],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  public readonly reloadCommentsEvent = new EventEmitter<UUID | void>()

  constructor(public readonly viewModel: ShowViewModel) { }

  public onCommentSubmitted(newCommentUuid: UUID): void {
    this.reloadCommentsEvent.emit(newCommentUuid)
  }
}
