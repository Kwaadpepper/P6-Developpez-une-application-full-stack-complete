import { NgIf, SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, effect, input } from '@angular/core'
import { ToastService } from '@core/services'
import { ButtonModule } from 'primeng/button'

import TopicCardViewModel, { TopicCard } from './topic-card.viewmodel'

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
  topicCardElement = input.required<TopicCard>()

  constructor(
    private readonly toastService: ToastService,
    public readonly viewModel: TopicCardViewModel,
  ) {
    effect(() => {
      this.viewModel.setTopic(this.topicCardElement())
    })
  }

  onSubscribeClick(topicName: string): void {
    this.viewModel.subscribeTo(this.viewModel.topic().uuid)
      .add(() => {
        this.toastService.success(`Vous suivez le thème ${topicName}`)
      })
  }

  onUnsubscribeClick(topicName: string): void {
    this.viewModel.unsubscribeFrom(this.viewModel.topic().uuid)
      .add(() => {
        this.toastService.warning(`Vous ne suivez plus le thème ${topicName}`)
      })
  }
}
