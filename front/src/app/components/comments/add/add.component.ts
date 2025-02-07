import { Component, effect, EventEmitter, Input, Output, untracked } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import { ButtonModule } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import { TabsModule } from 'primeng/tabs'
import { TextareaModule } from 'primeng/textarea'

import { NgIf } from '@angular/common'
import { UUID } from '@core/types'
import { MessageModule } from 'primeng/message'
import AddViewModel from './add.viewmodel'

@Component({
  selector: 'app-add-comment',
  imports: [
    NgIf,
    ReactiveFormsModule,
    ButtonModule,
    TextareaModule,
    ScrollPanelModule,
    TabsModule,
    MarkdownModule,
    MessageModule,
    PanelModule,
  ],
  providers: [
    AddViewModel,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  @Input({ required: true }) set forPost(value: UUID) {
    this.viewModel.setPostUuid(value)
  }

  @Output()
  submitComment = new EventEmitter<void>()

  public readonly form = new FormGroup({
    content: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
  })

  constructor(
    public readonly viewModel: AddViewModel,
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.viewModel.content.set(value.content ?? '')
    })

    effect(() => {
      const comment = this.viewModel.content()

      untracked(() => {
        this.form.controls.content.setValue(comment)
      })
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.viewModel.setErrorMessage('Le contenu du commentaire n\'est pas valide')
      return
    }

    this.viewModel.saveComment().subscribe({
      next: () => {
        this.submitComment.emit()
      },
    })
  }
}
