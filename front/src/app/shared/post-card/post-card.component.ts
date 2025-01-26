import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { MarkdownService } from 'ngx-markdown'

import Post from '../../core/models/Post.type'
import { NiceDate } from '../../pipes/NiceDate'

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
export class PostCardComponent implements OnInit {
  @Input({ required: true })
  public post: Post = {} as Post

  public strippedPostContent = ''

  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.strippedPostContent = ''
    const parsed = this.markdownService.parse(this.post.content, {
      decodeHtml: false,
      inline: false,
      mermaid: false,
    })
    if (typeof parsed === 'string') {
      this.strippedPostContent = this.decodeHTmlEntities(
        parsed.replace(/<\/?[^>]+(>|$)/g, ''),
      )
      return
    }
    parsed.then((value) => {
      this.strippedPostContent = this.decodeHTmlEntities(
        value.replace(/<\/?[^>]+(>|$)/g, ''),
      )
    })
  }

  private decodeHTmlEntities(value: string): string {
    const element = document.createElement('div')

    if (value && typeof value === 'string') {
      // strip script/html tags
      value = value.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '')
      value = value.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '')
      element.innerHTML = value
      value = element.textContent ?? ''
      element.textContent = ''
    }

    return value
  }
}
