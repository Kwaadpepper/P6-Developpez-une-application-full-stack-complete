import { computed, Injectable, signal } from '@angular/core'

import { TopicName } from '@core/interfaces'
import { errors, PostService, TopicService } from '@core/services'
import { UUID } from '@core/types'
import { catchError, EMPTY, finalize, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [PostService, TopicService],
})
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

  private readonly pagninatedTopicNames = signal<TopicName[]>([])
  public readonly filteredTopicNames = signal<TopicName[]>([])

  public readonly topicNames = computed<TopicName[]>(() => {
    const filteredTopicNames = this.filteredTopicNames()

    return filteredTopicNames.length ? this.filteredTopicNames() : this.pagninatedTopicNames()
  })

  private readonly pagninatedPage = signal<number>(1)
  private readonly filteredPage = signal<number>(1)

  public readonly topicsPage = computed<number>(() => {
    const filteredTopicNames = this.filteredTopicNames()

    return filteredTopicNames.length ? this.filteredPage() : this.pagninatedPage()
  })

  private readonly pagninatedTotalItems = signal<number>(0)
  private readonly filteredTotalItems = signal<number>(0)

  public readonly topicsTotalItems = computed<number>(() => {
    const filteredTopicNames = this.filteredTopicNames()

    return filteredTopicNames.length ? this.filteredTotalItems() : this.pagninatedTotalItems()
  })

  public readonly topicsPerPage = 30
  public readonly topicsAreLoading = signal(false)

  constructor(
    private postService: PostService,
    private topicService: TopicService,
  ) {
  }

  public searchForTopicNames(page: number, searchLike: string): void {
    this.filteredTopicNames.set([])
    this.loadTopicNames(page, searchLike)
  }

  public getTopicNamesPage(page: number): void {
    this.loadTopicNames(page)
  }

  public resetTopicFilters(): void {
    this.filteredTopicNames.set([])
    this.filteredPage.set(1)
    this.filteredTotalItems.set(0)
  }

  public setTopicNameByUUID(uuid: UUID): void {
    const topicName = this.topicNames().find(topicName => topicName.uuid === uuid)

    if (topicName === undefined) {
      throw new Error('Topic not found')
    }

    this.topicName.set(topicName)
  }

  public persistPost(): Observable<string> {
    this.loading.set(true)
    this.resetErrors()

    return this.postService.createPost(
      this.title(),
      this.content(),
      this.topicName(),
    ).pipe(
      map((newPostSlug) => {
        this.formErrorMessage.set('')
        return newPostSlug
      }),
      catchError((error) => {
        if (error instanceof errors.ValidationError) {
          this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
          this.setErrors(error.getErrors())
          return EMPTY
        }

        this.formErrorMessage.set(error.message)
        return EMPTY
      }),
      finalize(() => {
        this.loading.set(false)
      }),
    )
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

  private loadTopicNames(page: number, searchLike = ''): void {
    if (this.topicsAreLoading()) {
      return
    }

    this.topicsAreLoading.set(false)
    this.topicService.paginateTopicsNames(page, searchLike)
      .subscribe({
        next: (topics) => {
          if (searchLike.length) {
            this.filteredTotalItems.set(topics.totalItems)
            this.filteredPage.set(topics.page)
            this.filteredTopicNames.update((topicNames) => {
              return [...topicNames, ...topics.list]
            })
            return
          }

          this.pagninatedTotalItems.set(topics.totalItems)
          this.pagninatedPage.set(topics.page)
          this.pagninatedTopicNames.update((topicNames) => {
            return [...topicNames, ...topics.list]
          })
        },
        complete: () => {
          this.topicsAreLoading.set(false)
        },
      })
  }
}
