import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, EventEmitter } from '@angular/core'
import { CommentAddComponent, CommentsListComponent } from '@components/index'
import { NiceDate } from '@pipes/NiceDate'
import { BackButtonComponent } from '@shared/index'
import { MarkdownModule } from 'ngx-markdown'
import ShowViewModel from './show.viewmodel'

@Component({
  selector: 'app-show-post',
  imports: [
    SlicePipe, TitleCasePipe,
    BackButtonComponent, NiceDate,
    MarkdownModule,
    CommentsListComponent,
    CommentAddComponent,
  ],
  providers: [ShowViewModel],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  public readonly reloadCommentsEvent = new EventEmitter<void>()

  constructor(public readonly viewModel: ShowViewModel) { }

  public onCommentSubmitted(): void {
    this.reloadCommentsEvent.emit()
  }
}
