import { NgFor, NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh'
import { ButtonModule } from 'primeng/button'
import { filter, Subject, switchMap, takeUntil } from 'rxjs'

import { PostCardComponent, ProgressSpinnerComponent } from '@shared/index'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list-posts',
  imports: [
    NgFor, NgIf,
    PostCardComponent,
    ButtonModule, RouterModule,
    InfiniteScrollDirective,
    ProgressSpinnerComponent,
    NgxPullToRefreshModule,
  ],
  providers: [ListViewModel],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  private readonly endObservables = new Subject<true>()

  constructor(
    public readonly viewModel: ListViewModel,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.viewModel.reloadPosts()
      .pipe(takeUntil(this.endObservables))
      .subscribe()

    this.router.events.pipe(
      takeUntil(this.endObservables),
      filter(event => event instanceof NavigationEnd),
      filter((event) => {
        const currentNavigation = this.router.getCurrentNavigation()
        const isPostListRoute = event.url === '/posts'
        const hasAnyPost = this.viewModel.posts().length > 0
        const doRefresh = isPostListRoute
          && (!hasAnyPost
            || currentNavigation?.extras.state?.['refresh']
            || this.viewModel.feedInvalidated())

        return doRefresh
      }),
      switchMap(() => this.viewModel.reloadPosts()),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  onRefresh(): void {
    this.viewModel.reloadPosts()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  onPullToRefresh(event: Subject<unknown>): void {
    this.onRefresh()
    event.next(null)
  }

  onScroll(): void {
    this.viewModel.feedUserWithMorePosts()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  onClickFeedSorting(): void {
    this.viewModel.togglePostsSorting()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }
}
