import { NgFor, NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh'
import { ButtonModule } from 'primeng/button'
import { filter, Subject } from 'rxjs'

import { PostCardComponent, ProgressSpinnerComponent } from '@shared/index'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list',
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

  constructor(
    public readonly viewModel: ListViewModel,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
    this.viewModel.feedUserWithMorePosts()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe({
      next: (event: NavigationEnd) => {
        const currentNavigation = this.router.getCurrentNavigation()
        const isPostListRoute = event.url === '/posts'
        const doRefresh = isPostListRoute
          && (currentNavigation?.extras.state?.['refresh']
            || this.viewModel.feedInvalidated())

        if (!doRefresh) {
          return
        }

        this.viewModel.reloadPosts()
      },
    })
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.')
  }

  onRefresh(): void {
    this.viewModel.reloadPosts()
  }

  onPullToRefresh(event: Subject<unknown>): void {
    this.onRefresh()
    event.next(null)
  }

  onScroll(): void {
    this.viewModel.feedUserWithMorePosts()
  }

  onClickFeedSorting(): void {
    this.viewModel.togglePostsSorting()
  }
}
