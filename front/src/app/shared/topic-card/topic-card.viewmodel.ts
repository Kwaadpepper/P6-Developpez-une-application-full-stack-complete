import { computed, Injectable, signal } from '@angular/core'
import { MarkdownService } from 'ngx-markdown'
import { Subscription } from 'rxjs'

import { FeedService, TopicService } from '@core/services'
import { decodeHTmlEntities } from '@core/tools/decodeHtmlEntities'
import { UUID } from '@core/types'

export interface TopicCard {
  uuid: string
  name: string
  description: string
  subscribed: boolean
}
@Injectable({
  providedIn: 'root',
  deps: [
    TopicService,
    FeedService,
    MarkdownService,
  ],
})
export default class TopicCardViewModel {
  public _topic = signal<TopicCard>({
    uuid: '',
    name: '',
    description: '',
    subscribed: false,
  })

  public readonly topic = computed(() => this._topic())
  public readonly canSubscribe = computed(() => !this._topic().subscribed)
  public readonly strippedTopicContent = signal('')

  constructor(
    private feedService: FeedService,
    private topicService: TopicService,
    private markdownService: MarkdownService,
  ) {
  }

  public setTopic(topic: TopicCard): void {
    const topicDecription = topic.description

    this._topic.update((current) => {
      current.uuid = topic.uuid
      current.name = topic.name
      current.description = topicDecription
      current.subscribed = topic.subscribed
      return current
    })

    this.getPlainHtmlFromMarkdown(topicDecription).then((html) => {
      const stripped = this.getPlainTextFromHtml(html)
      this.strippedTopicContent.set(stripped)
    })
  }

  public subscribeTo(topicUuid: UUID): Subscription {
    return this.topicService.subcribeToTopic(topicUuid)
      .subscribe({
        next: () => {
          this.feedService.invalidateFeed()
          this._topic.update((current) => {
            return { ...current, subscribed: true }
          })
        },
        error: (error) => {
          console.error('Error:', error)
        },
      })
  }

  public unsubscribeFrom(topicUuid: UUID): Subscription {
    return this.topicService.unSubcribeFromTopic(topicUuid)
      .subscribe({
        next: () => {
          this.feedService.invalidateFeed()
          this._topic.update((current) => {
            return { ...current, subscribed: false }
          })
        },
        error: (error) => {
          console.error('Error:', error)
        },
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
