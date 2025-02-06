import { computed, Injectable, signal } from '@angular/core'

import { Topic } from '@core/interfaces'
import { decodeHTmlEntities } from '@core/tools/decodeHtmlEntities'
import { MarkdownService } from 'ngx-markdown'

@Injectable({
  providedIn: 'root',
  deps: [MarkdownService],
})
export default class TopicCardViewModel {
  private _topic = signal({
    uuid: '',
    name: '',
    description: '',
  })

  public readonly topic = computed(() => this._topic())
  public readonly strippedTopicContent = signal('')

  constructor(
    private markdownService: MarkdownService,
  ) {
  }

  public setTopic(topic: Topic): void {
    const topicDecription = topic.description

    this._topic.update((current) => {
      current.uuid = topic.uuid
      current.name = topic.name
      current.description = topicDecription
      return current
    })

    this.getPlainHtmlFromMarkdown(topicDecription).then((html) => {
      const stripped = this.getPlainTextFromHtml(html)
      this.strippedTopicContent.set(stripped)
    })
  }

  private async getPlainHtmlFromMarkdown(markdown: string): Promise<string> {
    const parsed = this.markdownService.parse(markdown, {
      decodeHtml: false,
      inline: false,
      mermaid: false,
    })

    return typeof parsed === 'string' ? parsed : (await parsed)
  }

  private getPlainTextFromHtml(html: string): string {
    return decodeHTmlEntities(html.replace(/<\/?[^>]+(>|$)/g, ''))
  }
}
