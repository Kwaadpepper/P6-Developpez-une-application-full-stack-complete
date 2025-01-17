import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { BackButtonComponent } from '../../../lib/components/back-button/back-button.component'

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, BackButtonComponent,
    InputTextModule, ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
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

  public onLogin(): void {
    this.router.navigateByUrl('/posts')
  }
}
