import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'

import { ToastService } from '@core/services'
import { redirectUrls } from '@routes'
import { BackButtonComponent } from '@shared/index'
import LoginViewModel from './login.viewmodel'

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, BackButtonComponent,
    InputTextModule, ReactiveFormsModule,
    NgIf, MessageModule,
  ],
  providers: [LoginViewModel],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public form = new FormGroup({
    login: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
  })

  constructor(
    private toastService: ToastService,
    public viewModel: LoginViewModel,
    public router: Router,
  ) {
    this.viewModel = viewModel
    this.form.valueChanges.subscribe((value) => {
      this.viewModel.login.set(value.login ?? '')
      this.viewModel.password.set(value.password ?? '')
    })
  }

  public onSubmit(): void {
    const { login, password } = this.viewModel
    if (this.form.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.viewModel
      .proceedToLogin(login(), password()).then(() => {
        this.router.navigateByUrl(redirectUrls.posts)
      })
  }
}
