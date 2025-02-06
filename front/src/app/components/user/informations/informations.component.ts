import { NgIf } from '@angular/common'
import { Component, effect, OnInit } from '@angular/core'
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
        Validators.required,
      ],
    }),
  })

  constructor(
    public readonly viewModel: InformationsViewModel,
    private readonly toastService: ToastService,
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

  ngOnInit(): void {
    this.viewModel.refreshUserInformation()
  }

  onSubmit(): void {
    this.viewModel.updateUserInformation().then(() => {
      this.toastService.success('Informations mises à jour')
    }).catch(() => {
      this.toastService.error('Erreur lors de la mise à jour des informations')
    })
  }
}
