import { NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LazyLoadEvent } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { SelectFilterEvent, SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs'

import { ToastService } from '@core/services'
import { UUID } from '@core/types'
import { BackButtonComponent, MarkdownEditorComponent } from '@shared/index'
import CreateViewModel from './create.viewmodel'

interface selectOptions {
  label: string
  value: string
}

@Component({
  selector: 'app-create',
  imports: [
    SelectModule, BackButtonComponent, ButtonModule,
    InputTextModule, ReactiveFormsModule, TextareaModule,
    NgIf, MessageModule, MarkdownEditorComponent,
  ],
  providers: [CreateViewModel],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit, OnDestroy {
  private readonly topicSearch = ''

  /** The subject for user topic names search */
  private readonly searchTopicName$ = new Subject<string>()

  public readonly selectOptions = signal<selectOptions>({
    label: 'name',
    value: 'uuid',
  })

  public readonly form = new FormGroup({
    topicName: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    title: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
  })

  private readonly endObservables = new Subject<true>()

  constructor(
    private router: Router,
    public viewModel: CreateViewModel,
    private toastService: ToastService,
  ) {
    this.form.valueChanges
      .pipe(takeUntil(this.endObservables))
      .subscribe((value) => {
        if (value.topicName) {
          this.viewModel.setTopicNameByUUID(value.topicName ?? '')
        }
        this.viewModel.title.set(value.title ?? '')
        this.viewModel.content.set(value.content ?? '')
      })
  }

  ngOnInit(): void {
    // * Debounce search topic names
    this.searchTopicName$.pipe(
      takeUntil(this.endObservables),
      debounceTime(500),
      distinctUntilChanged(),
      // * Search for topic names
      switchMap(filter => this.viewModel.searchForTopicNames(1, filter)),
    ).subscribe()

    // * Init topic names
    this.viewModel.getTopicNamesPage(1)
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  /** Filter topics names when the user types in the dropdown */
  onFilterTopicsNames(event: SelectFilterEvent): void {
    this.searchTopicName$.next(event.filter)
  }

  /** Clear the topic name filter when the user hides the dropdown */
  onHideTopicsNamesFilter(): void {
    this.searchTopicName$.next('')
  }

  /** Lazy load topics names when the user scrolls the dropdown */
  onLazyloadTopicsNames(event: LazyLoadEvent): void {
    const currentPage = this.viewModel.currentPage()
    const nextPage = Math.floor((event.last ?? 0) / this.viewModel.topicsPerPage) + 1

    if (currentPage >= nextPage) {
      return
    }

    if (!this.topicSearch.length) {
      this.viewModel.getTopicNamesPage(nextPage)
        .pipe(takeUntil(this.endObservables))
        .subscribe()
      return
    }

    this.viewModel.searchForTopicNames(nextPage, this.topicSearch)
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  /** Select a topic name when the user clicks on it in the dropdown */
  onSelectTopic(event: {
    originalEvent: Event
    value: UUID
  }): void {
    const selectedTopicUuid = event.value

    this.viewModel.setTopicNameByUUID(selectedTopicUuid)
  }

  /** Create a post */
  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.viewModel.persistPost()
      .pipe(takeUntil(this.endObservables))
      .subscribe({
        next: () => {
          this.toastService.success('Post créé')
          this.router.navigate(['posts'], {
            state: { refresh: true },
          })
        },
      })
  }
}
