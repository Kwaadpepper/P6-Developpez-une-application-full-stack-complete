import { NgIf } from '@angular/common'
import { Component, effect, Input, OnDestroy, output, untracked } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { MessageModule } from 'primeng/message'
import { Subject, takeUntil } from 'rxjs'

import { ToastService } from '@core/services'
import { UUID } from '@core/types'
import { MarkdownEditorComponent } from '@shared/index'
import { AddViewModel } from './add.viewmodel'

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
export class AddComponent implements OnDestroy {
  @Input({ required: true }) set forPost(value: UUID) {
    this.viewModel.setPostUuid(value)
  }

  commentAdded = output<UUID>()

  private readonly endObservables = new Subject<true>()

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
    this.form.valueChanges
      .pipe(takeUntil(this.endObservables))
      .subscribe((value) => {
        this.viewModel.content.set(value.content ?? '')
      })

    /**
     * Reset the comment form control when
     * the view model content is updated
     */
    effect(() => {
      const comment = this.viewModel.content()

      untracked(() => {
        this.form.controls.content.setValue(comment)
      })
    })
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.viewModel.setErrorMessage('Le contenu du commentaire n\'est pas valide')
      return
    }

    this.viewModel.saveComment()
      .pipe(takeUntil(this.endObservables))
      .subscribe({
        next: (commentUuid) => {
          this.commentAdded.emit(commentUuid)
          this.form.reset()
          this.toastService.success('Commentaire ajouté avec succès')
        },
      })
  }
}
