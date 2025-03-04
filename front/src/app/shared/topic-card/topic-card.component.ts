import { NgIf, SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, effect, input, untracked } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { Subject, takeUntil } from 'rxjs'

import { ToastService } from '@core/services'
import { TopicCard, TopicCardViewModel } from './topic-card.viewmodel'

@Component({
  selector: 'app-topic-card',
  imports: [
    TitleCasePipe, SlicePipe,
    NgIf, ButtonModule,
  ],
  providers: [TopicCardViewModel],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCardComponent {
  readonly topicCardElement = input.required<TopicCard>()

  private readonly endObservables = new Subject<true>()

  constructor(
    private readonly toastService: ToastService,
    public readonly viewModel: TopicCardViewModel,
  ) {
    effect(() => {
      const topicCard = this.topicCardElement()

      untracked(() => {
        this.viewModel.setTopic(topicCard)
      })
    })
  }

  onSubscribeClick(topicName: string): void {
    this.viewModel.subscribeTo(this.viewModel.topic().uuid)
      .pipe(
        takeUntil(this.endObservables),
      ).subscribe(() => {
        this.toastService.success(`Vous suivez le thème ${topicName}`)
      })
  }

  onUnsubscribeClick(topicName: string): void {
    this.viewModel.unsubscribeFrom(this.viewModel.topic().uuid)
      .pipe(
        takeUntil(this.endObservables),
      ).subscribe(() => {
        this.toastService.warning(`Vous ne suivez plus le thème ${topicName}`)
      })
  }
}
