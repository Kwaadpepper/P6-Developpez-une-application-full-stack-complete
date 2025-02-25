import { NgFor, NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import { InputTextModule } from 'primeng/inputtext'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil, tap } from 'rxjs'

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
export class ListComponent implements OnInit, OnDestroy {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  public searchTerm = new FormControl('')

  private readonly endObservables = new Subject<true>()

  constructor(
    public readonly viewModel: ListViewModel,
  ) {
  }

  ngOnInit(): void {
    // * Load the initial topics
    this.viewModel.reloadTopics()
      .pipe(takeUntil(this.endObservables))
      .subscribe()

    // * Reload the topics when the search term changes
    this.searchTerm.valueChanges.pipe(
      takeUntil(this.endObservables),
      tap(() => this.viewModel.loading.set(true)),
      // * Wait for the user to stop typing
      debounceTime(750),
      // * Only emit when the value changes
      distinctUntilChanged(),
      tap((value) => {
        // * Set the topic name filter
        this.viewModel.setSetTopicNameFilter(value ?? undefined)
      }),
      // * Reload the topics
      switchMap(() => this.viewModel.reloadTopics()),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  /** Load more topics when the user scrolls to the bottom of the page */
  onScroll(): void {
    this.viewModel.loadMoreTopics()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  /** Reload the topics when the user clicks the search button */
  onSearch(): void {
    this.viewModel.reloadTopics()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  /** Clear the search term */
  onClearSearch(): void {
    this.searchTerm.setValue('')
  }
}
