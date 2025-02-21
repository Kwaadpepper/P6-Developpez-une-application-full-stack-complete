import { NgIf } from '@angular/common'
import { Component, input, Input, OnInit, output } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import { PanelModule } from 'primeng/panel'
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
    PanelModule,
    ReactiveFormsModule,
  ],
  providers: [MarkdownEditorViewModel],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css',
})
export class MarkdownEditorComponent implements OnInit {
  public readonly title = input.required<string>()
  public readonly textareaInput = input.required<FormControl>()

  @Input({ required: true }) set value(value: string) {
    this.viewModel.setValue(value)
    this.viewModel.resetError()
  }

  readonly showCharCount = input<boolean>(false)

  @Input() set error(value: string) {
    this.viewModel.setError(value)
  }

  public readonly contentChanged = output<string>()

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
