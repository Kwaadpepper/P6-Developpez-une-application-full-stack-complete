import { SlicePipe, TitleCasePipe } from '@angular/common'
import { Component } from '@angular/core'
import { NiceDate } from '@pipes/NiceDate'
import { BackButtonComponent } from '@shared/index'
import { MarkdownModule } from 'ngx-markdown'
import ShowViewModel from './show.viewmodel'

@Component({
  selector: 'app-show',
  imports: [
    SlicePipe, TitleCasePipe,
    BackButtonComponent, NiceDate,
    MarkdownModule,
  ],
  providers: [ShowViewModel],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  constructor(public readonly viewModel: ShowViewModel) {}
}
