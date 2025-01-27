import { Component, effect } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

import { NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { MessageModule } from 'primeng/message'
import { redirectUrls } from '../../../app.routes'
import { ToastService } from '../../../core/services'
import { BackButtonComponent } from '../../../shared/back-button/back-button.component'
import RegisterViewModel from './register.viewmodel'

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule, BackButtonComponent,
    InputTextModule, ReactiveFormsModule,
    MessageModule, NgIf,
  ],
  providers: [RegisterViewModel],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public form = new FormGroup({
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
        Validators.required,
      ],
    }),
  })

  constructor(
    private toastService: ToastService,
    public viewModel: RegisterViewModel,
    public router: Router,
  ) {
    this.viewModel = viewModel
    this.form.valueChanges.subscribe((value) => {
      this.viewModel.email.set(value.email ?? '')
      this.viewModel.username.set(value.username ?? '')
      this.viewModel.password.set(value.password ?? '')
    })
    effect(() => {
      const emailError = this.viewModel.errors.email()
      const usernameError = this.viewModel.errors.username()
      const passwordError = this.viewModel.errors.password()
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
  }

  public onSubmit(): void {
    const { email, username, password } = this.viewModel
    if (this.form.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.viewModel
      .proceedToRegister(email(), username(), password()).then(() => {
        this.router.navigateByUrl(redirectUrls.posts)
      })
  }
}
