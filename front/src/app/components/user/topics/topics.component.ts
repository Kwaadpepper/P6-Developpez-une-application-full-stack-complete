import { Component } from '@angular/core'
import TopicsViewModel from './topics.viewmodel'

@Component({
  selector: 'app-topics',
  imports: [],
  providers: [
    TopicsViewModel,
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  constructor(public readonly viewModel: TopicsViewModel) {}
}
