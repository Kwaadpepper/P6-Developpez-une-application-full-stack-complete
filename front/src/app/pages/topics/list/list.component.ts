import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ButtonModule } from 'primeng/button'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { BackButtonComponent, ProgressSpinnerComponent, TopicCardComponent } from '@shared/index'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list',
  imports: [
    NgIf, NgFor,
    ReactiveFormsModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TopicCardComponent,
    InfiniteScrollDirective,
    ProgressSpinnerModule,
    BackButtonComponent,
    ProgressSpinnerComponent,
  ],
  providers: [
    ListViewModel,
  ],
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
    this.viewModel.reloadTopics()
  }
}
