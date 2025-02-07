import { NgFor, NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { ToastService } from '@core/services'
import { UUID } from '@core/types'
import { TopicCardComponent } from '@shared/index'
import { BackButtonComponent } from '../../../shared/back-button/back-button.component'
import ListViewModel from './list.viewmodel'

@Component({
  selector: 'app-list',
  imports: [
    NgIf, NgFor,
    TopicCardComponent,
    InfiniteScrollDirective,
    ProgressSpinnerModule,
    BackButtonComponent,
  ],
  providers: [
    ListViewModel,
    ToastService,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  public readonly throttle = 1000
  public readonly scrollDistance = 1

  constructor(
    public readonly viewModel: ListViewModel,
    private readonly toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.viewModel.reloadTopics()
  }

  onScroll(): void {
    this.viewModel.loadMoreTopics()
  }

  onSubscribe(topicUuid: UUID): void {
    this.viewModel.subscribeTo(topicUuid).add(() => {
      this.toastService.success('Subscribed!')
    })
  }
}
