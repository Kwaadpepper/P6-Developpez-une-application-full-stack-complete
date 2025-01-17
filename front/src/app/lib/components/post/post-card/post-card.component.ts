import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, Input } from '@angular/core'
import Post from '../../../../core/models/Post.type'
import { NiceDate } from '../../../pipes/NiceDate'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div[app-post-card]',
  imports: [
    TitleCasePipe, SlicePipe,
    NiceDate,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true })
  public post: Post = {} as Post
}
