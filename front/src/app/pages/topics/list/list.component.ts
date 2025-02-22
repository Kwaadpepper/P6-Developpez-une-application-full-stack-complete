import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs'

import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { BackButtonComponent, ProgressSpinnerComponent, TopicCardComponent } from '@shared/index'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list-topics',
  imports: [
    NgIf, NgFor,
    ReactiveFormsModule,
    ButtonModule,
    TopicCardComponent,
    InfiniteScrollDirective,
    ProgressSpinnerModule,
    BackButtonComponent,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ProgressSpinnerComponent,
  ],
  providers: [ListViewModel],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  public searchTerm = new FormControl('')

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
  }

  ngOnInit(): void {
    this.viewModel.reloadTopics()
    this.searchTerm.valueChanges.pipe(
      tap(() => this.viewModel.loading.set(true)),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe({
      next: (value) => {
        this.viewModel.setSetTopicNameFilter(value ?? undefined)
        this.viewModel.reloadTopics()
      },
    })
  }

  onScroll(): void {
    this.viewModel.loadMoreTopics()
  }

  onSearch(): void {
    this.viewModel.reloadTopics()
  }

  onClearSearch(): void {
    this.searchTerm.setValue('')
  }
}
