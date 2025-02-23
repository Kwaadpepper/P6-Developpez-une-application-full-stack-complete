import { NgIf } from '@angular/common'
import { Component, input, Input, OnInit, output } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import { TabsModule } from 'primeng/tabs'
import { TextareaModule } from 'primeng/textarea'
import { debounceTime } from 'rxjs'
import MarkdownEditorViewModel from './markdown-editor.viewmodel'

@Component({
  selector: 'app-markdown-editor',
  imports: [
    NgIf,
    TextareaModule,
    TabsModule,
    MarkdownModule,
    ReactiveFormsModule,
  ],
  providers: [MarkdownEditorViewModel],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css',
})
export class MarkdownEditorComponent implements OnInit {
  readonly title = input.required<string>()
  readonly textareaInput = input.required<FormControl>()
  readonly ariaLabel = input.required<string>()
  readonly showCharCount = input<boolean>(false)
  readonly classList = input<string>('')

  readonly contentChanged = output<string>()

  @Input({ required: true }) set value(value: string) {
    this.viewModel.setValue(value)
    this.viewModel.resetError()
  }

  @Input() set error(value: string) {
    this.viewModel.setErrorMessage(value)
  }

  constructor(
    public readonly viewModel: MarkdownEditorViewModel,
  ) {}

  ngOnInit(): void {
    this.textareaInput().valueChanges
      .pipe(
        debounceTime(500),
      ).subscribe((value) => {
        this.viewModel.setValue(value)
        this.contentChanged.emit(value)
      })
  }
}
