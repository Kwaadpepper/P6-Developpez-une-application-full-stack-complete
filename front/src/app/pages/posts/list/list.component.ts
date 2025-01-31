import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ButtonModule } from 'primeng/button'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { PostCardComponent } from '../../../shared'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list',
  imports: [
    NgFor, NgIf,
    PostCardComponent,
    ButtonModule, RouterModule,
    InfiniteScrollDirective,
    ProgressSpinnerModule,
  ],
  providers: [ListViewModel],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public throttle = 1000
  public scrollDistance = 1

  constructor(public viewModel: ListViewModel) {
  }

  ngOnInit(): void {
    this.viewModel.feedUserWithMorePosts()
  }

  onScroll(): void {
    this.viewModel.feedUserWithMorePosts()
  }

  onClickFeedSorting(): void {
    this.viewModel.togglePostsSorting()
  }
}
