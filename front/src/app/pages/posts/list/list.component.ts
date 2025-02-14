import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh'
import { ButtonModule } from 'primeng/button'

import { ProgressSpinnerComponent } from '@components/index'
import { PostCardComponent } from '@shared/index'
import { Subject } from 'rxjs'
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
export class ListComponent implements OnInit {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  constructor(public viewModel: ListViewModel) {
  }

  ngOnInit(): void {
    this.viewModel.feedUserWithMorePosts()
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
