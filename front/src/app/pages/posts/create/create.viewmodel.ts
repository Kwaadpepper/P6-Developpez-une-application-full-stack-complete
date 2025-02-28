import { computed, Injectable, signal } from '@angular/core'
import { catchError, EMPTY, finalize, map, Observable, of, tap } from 'rxjs'

import { TopicName } from '@core/interfaces'
import { errors, PostService, TopicService } from '@core/services'
import { UUID } from '@core/types'

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

  private readonly _topicNames = signal<TopicName[]>([])
  public readonly topicNames = computed<TopicName[]>(() => this._topicNames())

  private readonly _currentPage = signal<number>(1)
  public readonly currentPage = computed<number>(() => this._currentPage())

  private readonly _totalTopicNamesCount = signal<number>(0)
  public readonly totalTopicNamesCount = computed<number>(() => this._totalTopicNamesCount())

  public readonly topicsPerPage = 30

  public readonly creatingTopicLoading = signal(false)
  public readonly topicsNamesAreLoading = signal(false)

  constructor(
    private postService: PostService,
    private topicService: TopicService,
  ) {
  }

  /**
   * Search for topic names
   *
   * @param  {number} page
   * @param  {string} searchLike
   * @return  {Observable<void>}
   */
  public searchForTopicNames(page: number, searchLike: string): Observable<void> {
    this._topicNames.set([])
    return this.loadTopicNames(page, searchLike)
  }

  /**
   * Get topic names page
   *
   * @param  {number} page
   * @return  {Observable<void>}
   */
  public getTopicNamesPage(page: number): Observable<void> {
    return this.loadTopicNames(page)
  }

  /**
   * Set the topic name by its UUID
   *
   * @param  {UUID} uuid
   */
  public setTopicNameByUUID(uuid: UUID): void {
    const topicName = this.topicNames().find(topicName => topicName.uuid === uuid)

    if (topicName === undefined) {
      throw new Error('Topic not found')
    }

    this.topicName.set(topicName)
  }

  /**
   * Submit the post form
   *
   * @return  {Observable<string>} Observable that emits the new post slug
   */
  public persistPost(): Observable<string> {
    this.creatingTopicLoading.set(true)
    this.resetErrors()

    return this.postService.createPost(
      this.title(),
      this.content(),
      this.topicName(),
    ).pipe(
      map((newPostSlug) => {
        this.creatingTopicLoading.set(false)
        this.formErrorMessage.set('')
        return newPostSlug
      }),
      catchError((error) => {
        if (error instanceof errors.ValidationError) {
          this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
          this.setErrors(error.getErrors())
          return of(error)
        }

        this.formErrorMessage.set(error.message)
        return of(error)
      }),
      finalize(() => {
        this.creatingTopicLoading.set(false)
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

  /**
   * Load topic names
   *
   * @param  {number} page
   * @param  {string} searchLike
   * @return  {Observable<void>}
   */
  private loadTopicNames(page: number, searchLike = ''): Observable<void> {
    if (this.topicsNamesAreLoading()) {
      return EMPTY
    }

    this.topicsNamesAreLoading.set(false)
    return this.topicService.paginateTopicsNames(page, searchLike)
      .pipe(
        tap((topics) => {
          this.topicsNamesAreLoading.set(false)
          if (searchLike.length) {
            this._totalTopicNamesCount.set(topics.totalItems)
            this._currentPage.set(topics.page)
            this._topicNames.update((topicNames) => {
              return [...topicNames, ...topics.list]
            })
            return
          }

          this._totalTopicNamesCount.set(topics.totalItems)
          this._currentPage.set(topics.page)
          this._topicNames.update((topicNames) => {
            return [...topicNames, ...topics.list]
          })
        }),
        map(() => { return }),
        finalize(() => {
          this.topicsNamesAreLoading.set(false)
        }),
      )
  }
}
