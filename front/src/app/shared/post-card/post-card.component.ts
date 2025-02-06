import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, Input } from '@angular/core'

import { RouterLink } from '@angular/router'
import { Post } from '@core/interfaces'
import { NiceDate } from '@pipes/NiceDate'
import PostCardViewModel from './post-card.viewmodel'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div[app-post-card]',
  imports: [
    TitleCasePipe, SlicePipe,
    NiceDate, RouterLink,
  ],
  providers: [
    PostCardViewModel,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) set post(value: Post) {
    this.viewModel.setPost(value)
  }

  constructor(public readonly viewModel: PostCardViewModel) {}
}
