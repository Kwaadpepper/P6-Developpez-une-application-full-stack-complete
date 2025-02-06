import { NgIf } from '@angular/common'
import { Component, effect, OnInit, untracked } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'

import { ToastService } from '@core/services'
import InformationsViewModel from './informations.viewmodel'

@Component({
  selector: 'app-informations',
  imports: [
    InputTextModule, ReactiveFormsModule,
    MessageModule, NgIf, ButtonModule,
  ],
  providers: [
    InformationsViewModel,
  ],
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css',
})
export class InformationsComponent implements OnInit {
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

  constructor(
    public readonly viewModel: InformationsViewModel,
    private readonly toastService: ToastService,
  ) {
    // * Update the view model with the form values
    this.form.valueChanges.subscribe((value) => {
      this.viewModel.email.set(value.email ?? '')
      this.viewModel.username.set(value.username ?? '')
      this.viewModel.password.set(value.password ?? '')
    })

    effect(() => {
      const email = this.viewModel.email()
      const username = this.viewModel.username()
      const password = this.viewModel.password()

      const emailError = this.viewModel.errors.email()
      const usernameError = this.viewModel.errors.username()
      const passwordError = this.viewModel.errors.password()

      untracked(() => {
        // * Update the form with the view model values
        this.form.controls.email.setValue(email)
        this.form.controls.username.setValue(username)
        this.form.controls.password.setValue(password)

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
  }

  onSubmit(): void {
    this.viewModel.updateUserInformation().subscribe({
      next: () => {
        this.toastService.success('Votre profil a été mis à jour !')
      },
      error: (error) => {
        this.toastService.error('Erreur lors de la mise à jour des informations')
        console.error('Error:', error)
      },
    })
  }
}
