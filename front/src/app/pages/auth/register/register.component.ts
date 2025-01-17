import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'

import { Router } from '@angular/router'
import { BackButtonComponent } from '../../../lib/components/back-button/back-button.component'

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule, BackButtonComponent,
    InputTextModule, ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
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
        Validators.minLength(8),
      ],
    }),
  })

  constructor(
    private router: Router,
  ) { }

  public onRegister(): void {
    this.router.navigateByUrl('/posts')
  }
}
