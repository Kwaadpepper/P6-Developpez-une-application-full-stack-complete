import { Component, effect, Input, output, untracked } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastService } from '@core/services'
import { ButtonModule } from 'primeng/button'

import { NgIf } from '@angular/common'
import { UUID } from '@core/types'
import { MarkdownEditorComponent } from '@shared/markdown-editor/markdown-editor.component'
import { MessageModule } from 'primeng/message'
import AddViewModel from './add.viewmodel'

@Component({
  selector: 'app-add-comment',
  imports: [
    NgIf,
    ReactiveFormsModule,
    ButtonModule,
    MessageModule,
    MarkdownEditorComponent,
  ],
  providers: [AddViewModel],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  @Input({ required: true }) set forPost(value: UUID) {
    this.viewModel.setPostUuid(value)
  }

  commentAdded = output<UUID>()

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
    private readonly toastService: ToastService,
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
      next: (commentUuid) => {
        this.commentAdded.emit(commentUuid)
        this.form.reset()
        this.toastService.success('Commentaire ajouté avec succès')
      },
    })
  }
}
