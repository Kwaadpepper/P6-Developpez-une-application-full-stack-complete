import { NgIf, SlicePipe, TitleCasePipe } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ButtonModule } from 'primeng/button'

import { Topic } from '@core/interfaces'
import { UUID } from '@core/types'
import TopicCardViewModel from './topic-card.viewmodel'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'div[app-topic-card]',
  imports: [
    TitleCasePipe, SlicePipe,
    NgIf, ButtonModule,
  ],
  providers: [
    TopicCardViewModel,
    EventEmitter,
  ],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCardComponent {
  @Input({ required: true }) set topic(value: Topic) {
    this.viewModel.setTopic(value)
  }

  @Input({ required: true })
  public canSubscribe = true

  @Output()
  public subscribeEvent = new EventEmitter<UUID>()

  @Output()
  public unsubscribeEvent = new EventEmitter<UUID>()

  constructor(
    public readonly viewModel: TopicCardViewModel,
  ) { }

  onSubscribeClick(): void {
    const topic = this.viewModel.topic()
    this.subscribeEvent.emit(topic.uuid)
  }

  onUnsubscribeClick(): void {
    const topic = this.viewModel.topic()
    this.unsubscribeEvent.emit(topic.uuid)
  }
}
