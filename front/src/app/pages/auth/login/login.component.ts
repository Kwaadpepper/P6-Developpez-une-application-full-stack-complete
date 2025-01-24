import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessageModule } from 'primeng/message'

import LoginFailure from '../../../core/services/api/errors/LoginFailure'
import { AuthService } from '../../../core/services/auth.service'
import { ToastService } from '../../../core/services/toast.service'
import { BackButtonComponent } from '../../../lib/components/back-button/back-button.component'
import LoginViewModel from './login.viewmodel'

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, BackButtonComponent,
    InputTextModule, ReactiveFormsModule,
    NgIf, MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public viewModel = new LoginViewModel()

  public loginForm = new FormGroup({
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
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.loginForm.valueChanges.subscribe((value) => {
      this.viewModel.login.set(value.login ?? '')
      this.viewModel.password.set(value.password ?? '')
    })
  }

  public onSubmit(): void {
    const { login, password } = this.viewModel
    if (this.loginForm.invalid) {
      this.toastService.error('Tous les champs sont obligatoires')
      return
    }

    this.authService.login(
      login(), password(),
    ).subscribe({
      complete: () => {
        this.viewModel.clearFormErrorMessage()
        this.toastService.success('Connexion réussie')
        this.router.navigateByUrl('/posts')
      },
      error: (error) => {
        if (error instanceof LoginFailure) {
          this.viewModel.formErrorMessage.set('Identifiants incorrects')
          return
        }
        console.error('Error:', error)
        this.toastService.error('Erreur lors de la connexion')
      },
    })
  }
}
