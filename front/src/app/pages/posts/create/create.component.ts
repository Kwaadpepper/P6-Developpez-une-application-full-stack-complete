import { NgIf } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LazyLoadEvent } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { SelectFilterEvent, SelectModule } from 'primeng/select'
import { TextareaModule } from 'primeng/textarea'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'

import { Router } from '@angular/router'
import { MarkdownEditorComponent } from '@components/index'
import { ToastService } from '@core/services'
import { UUID } from '@core/types'
import { BackButtonComponent } from '@shared/index'
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
export class CreateComponent implements OnInit {
  private readonly topicSearch = ''
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

  constructor(
    private router: Router,
    public viewModel: CreateViewModel,
    private toastService: ToastService,
  ) {
    this.form.valueChanges.subscribe((value) => {
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
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filter) => {
      this.initFirstTopicPage(filter.length >= 2 ? filter : undefined)
    })

    // * Init topic names
    this.initFirstTopicPage()
  }

  onFilterTopicsNames(event: SelectFilterEvent): void {
    this.searchTopicName$.next(event.filter)
  }

  onLazyloadTopicsNames(event: LazyLoadEvent): void {
    const currentPage = this.viewModel.topicsPage()
    const nextPage = Math.floor((event.last ?? 0) / this.viewModel.topicsPerPage) + 1

    if (currentPage >= nextPage) {
      return
    }

    this.viewModel.getTopicNamesPage(
      nextPage,
      this.topicSearch,
    )
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
        this.router.navigate(['posts'], {
          state: { refresh: true },
        })
      },
    })
  }

  private initFirstTopicPage(filter = ''): void {
    this.viewModel.resetTopicNameList()
    this.viewModel.getTopicNamesPage(1, filter)
  }
}
