import { Injectable, signal } from '@angular/core'
import { AuthService, errors, ToastService } from '../../../core/services'

@Injectable()
export default class RegisterViewModel {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
  }

  public formErrorMessage = signal('')
  public readonly errors = {
    email: signal(''),
    username: signal(''),
    password: signal(''),
  }

  public readonly email = signal('')
  public readonly username = signal('')
  public readonly password = signal('')

  public proceedToRegister(
    email: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.resetErrors()
      this.authService.register(
        email, username, password,
      ).subscribe({
        complete: () => {
          this.formErrorMessage.set('')
          this.toastService.success('Inscription réussie')
          resolve(true)
        },
        error: (error) => {
          if (error instanceof errors.ValidationError) {
            this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
            this.setErrors(error.getErrors())
            return
          }

          this.toastService.error('Erreur lors de la création du compte')

          console.error('Error:', error)
          reject(error)
        },
      })
    })
  }

  private resetErrors(): void {
    Object.values(this.errors).forEach((error) => {
      error.set('')
    })
  }

  private setErrors(errors: Map<string, string>): void {
    this.errors.email.set(errors.get('email') ?? '')
    this.errors.username.set(errors.get('username') ?? '')
    this.errors.password.set(errors.get('password') ?? '')
  }
}
