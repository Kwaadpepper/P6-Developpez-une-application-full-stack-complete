import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'

import { UUID } from '@core/types'
import { ProgressSpinnerComponent, TopicCardComponent } from '@shared/index'
import TopicsViewModel from './topics.viewmodel'

@Component({
  selector: 'app-topics',
  imports: [
    NgIf, NgFor,
    TopicCardComponent,
    InfiniteScrollDirective,
    ProgressSpinnerComponent,
  ],
  providers: [TopicsViewModel],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  constructor(public readonly viewModel: TopicsViewModel) { }

  ngOnInit(): void {
    this.viewModel.reloadUserTopics()
  }

  onScroll(): void {
    this.viewModel.loadMoreUserTopics()
  }

  onUnsubscribe(topicUuid: UUID): void {
    this.viewModel.unsbuscribeFrom(topicUuid)
  }
}
