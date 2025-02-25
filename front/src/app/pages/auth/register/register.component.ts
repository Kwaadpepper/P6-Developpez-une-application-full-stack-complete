import { NgIf } from '@angular/common'
import { Component, effect, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'
import { SubscriptionLike } from 'rxjs'

import { ToastService } from '@core/services'
import { redirectUrls } from '@routes'
import { BackButtonComponent } from '@shared/index'
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
export class RegisterComponent implements OnDestroy {
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

  private registerSubscription: SubscriptionLike | null = null

  constructor(
    private readonly toastService: ToastService,
    public readonly viewModel: RegisterViewModel,
    public readonly router: Router,
  ) {
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

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe()
    }
  }

  public onSubmit(): void {
    const { email, username, password } = this.viewModel
    if (this.form.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.registerSubscription = this.viewModel
      .proceedToRegister(email(), username(), password())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(redirectUrls.posts)
        },
      })
  }
}
