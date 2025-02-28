import { NgIf } from '@angular/common'
import { Component, effect, OnDestroy, OnInit, signal, untracked } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { PasswordModule } from 'primeng/password'
import { Subject, takeUntil } from 'rxjs'

import { ToastService } from '@core/services'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'
import InformationsViewModel from './informations.viewmodel'

@Component({
  selector: 'app-informations',
  imports: [
    InputTextModule, PasswordModule,
    ReactiveFormsModule, InputGroupModule,
    InputGroupAddonModule,
    MessageModule, NgIf, ButtonModule,
  ],
  providers: [InformationsViewModel],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css',
})
export class InformationsComponent implements OnInit, OnDestroy {
  public readonly maskPassword = signal(true)

  public readonly form = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(0),
      ],
    }),
  })

  private readonly endObservables = new Subject<true>()

  constructor(
    public readonly viewModel: InformationsViewModel,
    private readonly toastService: ToastService,
  ) {
    // * Update the view model with the form values
    this.form.controls.email.valueChanges.subscribe((value) => {
      this.viewModel.email.set(value ?? '')
      this.viewModel.errors.email.set('')
    })
    this.form.controls.username.valueChanges.subscribe((value) => {
      this.viewModel.username.set(value ?? '')
      this.viewModel.errors.username.set('')
    })
    this.form.controls.password.valueChanges.subscribe((value) => {
      this.viewModel.password.set(value ?? '')
      this.viewModel.errors.password.set('')
    })

    // * Update the form with the view model values
    this.viewModel.hasRefreshedData
      .pipe(takeUntil(this.endObservables))
      .subscribe({
        next: () => {
          this.form.patchValue({
            email: this.viewModel.email(),
            username: this.viewModel.username(),
            password: this.viewModel.password(),
          })
        },
      })

    effect(() => {
      const emailError = this.viewModel.errors.email()
      const usernameError = this.viewModel.errors.username()
      const passwordError = this.viewModel.errors.password()

      untracked(() => {
        // * Update the form with the view model errors
        if (emailError) {
          this.form.controls.email.setErrors({ emailError })
        }
        if (usernameError) {
          this.form.controls.username.setErrors({ usernameError })
        }
        if (passwordError) {
          this.form.controls.password.setErrors({ passwordError })
        }
      })
    })
  }

  ngOnInit(): void {
    this.viewModel.refreshUserInformation()
      .pipe(takeUntil(this.endObservables))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  onToggleMask(): void {
    this.maskPassword.set(!this.maskPassword())
  }

  onSubmit(): void {
    this.viewModel.updateUserInformation()
      .pipe(takeUntil(this.endObservables))
      .subscribe({
        next: () => {
          this.toastService.success('Votre profil a été mis à jour !')
        },
        error: () => {
          this.toastService.error('Erreur lors de la mise à jour des informations')
        },
      })
  }
}
