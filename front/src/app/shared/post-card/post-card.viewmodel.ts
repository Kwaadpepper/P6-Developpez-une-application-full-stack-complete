import { computed, Injectable, signal } from '@angular/core'

import { Post } from '@core/interfaces'
import { decodeHTmlEntities } from '@core/tools/decodeHtmlEntities'
import { MarkdownService } from 'ngx-markdown'

@Injectable({
  providedIn: 'root',
  deps: [MarkdownService],
})
export default class PostCardViewModel {
  private _post = signal({
    slug: '',
    title: '',
    content: '',
    author_name: '',
    created_at: new Date(),
    updated_at: undefined as Date | undefined,
  })

  public readonly post = computed(() => this._post())

  constructor(
    private markdownService: MarkdownService,
  ) {
  }

  /**
   * Set post within the view model
   *
   * @param  {Post} post
   * @return  {void}
   */
  public setPost(post: Post): void {
    const postContent = post.content

    this.getPlainHtmlFromMarkdown(postContent).then((html) => {
      const stripped = this.getPlainTextFromHtml(html)
      this._post.update((current) => {
        current.slug = post.slug
        current.title = post.title
        current.author_name = post.author_name
        current.content = stripped
        current.created_at = post.created_at
        current.updated_at = post.updated_at
        return current
      })
    })
  }

  /**
   * Get plain HTML from markdown
   *
   * @param  {string} markdown
   * @return  {Promise<string>}
   */
  private async getPlainHtmlFromMarkdown(markdown: string): Promise<string> {
    const parsed = this.markdownService.parse(markdown)

    return typeof parsed === 'string' ? parsed : (await parsed)
  }

  /**
   * Get plain text from HTML
   *
   * @param  {string} html
   * @return  {string}
   */
  private getPlainTextFromHtml(html: string): string {
    return decodeHTmlEntities(html.replace(/<\/?[^>]+(>|$)/g, ''))
  }
}
