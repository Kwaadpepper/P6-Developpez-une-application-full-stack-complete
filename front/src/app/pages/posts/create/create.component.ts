import { NgIf } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ScrollerOptions } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { ScrollerScrollEvent } from 'primeng/scroller'
import { SelectFilterEvent, SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs'

import { Router } from '@angular/router'
import { ToastService } from '@core/services'
import { UUID } from '@core/types'
import { BackButtonComponent } from '../../../shared/back-button/back-button.component'
import CreateViewModel from './create.viewmodel'

interface selectOptions {
  virtualScrollOptions: ScrollerOptions
  label: string
  value: string
  totalRecords: number
}

@Component({
  selector: 'app-create',
  imports: [
    SelectModule, BackButtonComponent, ButtonModule,
    InputTextModule, ReactiveFormsModule, TextareaModule,
    NgIf, MessageModule],
  providers: [CreateViewModel],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  public readonly perPage = 30
  public readonly currentPage = signal(1)

  private readonly topicSearch = ''
  private readonly searchTopicName$ = new Subject<string>()

  public readonly selectOptions = signal<selectOptions>({
    label: 'name',
    value: 'uuid',
    totalRecords: this.perPage * 2,
    virtualScrollOptions: {
      step: this.perPage,
      delay: 300,
      showLoader: true,
      onScroll: this.onScrollTopicsNames.bind(this),
    },
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

  constructor(
    private router: Router,
    public viewModel: CreateViewModel,
    private toastService: ToastService,
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.viewModel.setTopicNameByUUID(value.topicName ?? '')
      this.viewModel.title.set(value.title ?? '')
      this.viewModel.content.set(value.content ?? '')
    })
  }

  ngOnInit(): void {
    // * Debounce search topic names
    this.searchTopicName$.pipe(
      filter(filter => filter.length >= 2),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filter) => {
      this.initFirstTopicPage(filter)
    })

    // * Init topic names
    this.initFirstTopicPage()
  }

  onFilterTopicsNames(event: SelectFilterEvent): void {
    this.searchTopicName$.next(event.filter)
  }

  onScrollTopicsNames(event: ScrollerScrollEvent): void {
    const htmlElement = event.originalEvent!.target as HTMLDivElement
    const elHeight = htmlElement.scrollHeight
    const scrollTop = htmlElement.scrollTop

    if (scrollTop + htmlElement.clientHeight === elHeight) {
      this.loadMoreTopicsNames(this.topicSearch)
    }
  }

  onSelectTopic(event: {
    originalEvent: Event
    value: UUID
  }): void {
    const selectedTopicUuid = event.value

    this.viewModel.setTopicNameByUUID(selectedTopicUuid)
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.viewModel.persistPost().subscribe({
      next: () => {
        this.toastService.success('Post créé')
        this.router.navigateByUrl('/posts')
      },
    })
  }

  private initFirstTopicPage(filter = ''): void {
    this.currentPage.set(1)
    this.viewModel.topicNames.set([])
    this.viewModel.getTopicNamesPage(1, filter).subscribe({
      complete: () => {
        this.selectOptions.update((current) => {
          return {
            ...current,
            totalRecords: this.viewModel.totalTopicNames(),
          }
        })
      },
    })
  }

  private loadMoreTopicsNames(filter = ''): void {
    this.currentPage.set(this.currentPage() + 1)
    this.viewModel.getTopicNamesPage(this.currentPage(), filter)
  }
}
