import { Injectable, signal } from '@angular/core'

import { TopicName } from '@core/interfaces'
import { errors, PostService, TopicService } from '@core/services'
import { UUID } from '@core/types'

@Injectable()
export default class CreateViewModel {
  public readonly formErrorMessage = signal('')
  public readonly errors = {
    title: signal(''),
    content: signal(''),
    topicName: signal(''),
  }

  public readonly title = signal('')
  public readonly content = signal('')
  public readonly topicName = signal<TopicName>({
    name: '',
    uuid: '',
  })

  public readonly loading = signal(false)

  public readonly topicNames = signal<TopicName[]>([])

  public readonly topicsAreLoading = signal(false)
  public readonly totalTopicNames = signal(0)

  constructor(
    private postService: PostService,
    private topicService: TopicService,
  ) {
  }

  public getTopicNamesPage(page: number, searchLike = ''): Promise<void> {
    this.topicsAreLoading.set(true)
    return this.topicService.paginateTopicsNames(page, searchLike)
      .then((topics) => {
        this.topicNames.update((current) => {
          return [...current, ...topics.list]
        })
        this.totalTopicNames.set(topics.totalItems)
      }).finally(() => {
        this.topicsAreLoading.set(false)
      })
  }

  public setTopicNameByUUID(uuid: UUID): void {
    const topicName = this.topicNames().find(topicName => topicName.uuid === uuid)

    if (topicName === undefined) {
      throw new Error('Topic not found')
    }

    this.topicName.set(topicName)
  }

  public persistPost(): Promise<string | false> {
    this.loading.set(true)
    this.resetErrors()

    return this.postService.createPost(
      this.title(),
      this.content(),
      this.topicName(),
    ).then((newPostSlug) => {
      this.loading.set(false)
      this.formErrorMessage.set('')
      return newPostSlug
    }).catch((error) => {
      this.loading.set(false)
      if (error instanceof errors.ValidationError) {
        this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
        this.setErrors(error.getErrors())
        return false
      }

      this.formErrorMessage.set(error.message)
      return false
    })
  }

  private resetErrors(): void {
    Object.values(this.errors).forEach((error) => {
      error.set('')
    })
  }

  private setErrors(errors: Map<string, string>): void {
    this.errors.content.set(errors.get('content') ?? '')
    this.errors.title.set(errors.get('title') ?? '')
    this.errors.topicName.set(errors.get('topicName') ?? '')
  }
}
