import { Injectable, signal } from '@angular/core'
import { catchError, finalize, Observable, of, tap } from 'rxjs'

import { AuthService, errors, ToastService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [AuthService, ToastService],
})
export class RegisterViewModel {
  public readonly formErrorMessage = signal('')
  public readonly errors = {
    email: signal(''),
    username: signal(''),
    password: signal(''),
  }

  public readonly email = signal('')
  public readonly username = signal('')
  public readonly password = signal('')

  public readonly loading = signal(false)

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
  }

  /**
   * Register the user and set the session
   *
   * @return  {[type]} {Observable<boolean>} Observable that emits true if the user is registered
   */
  public registerUserAndSetSession(
    email: string,
    username: string,
    password: string,
  ): Observable<boolean> {
    this.loading.set(true)
    this.resetErrors()
    return this.authService.register({ email, username, password })
      .pipe(
        tap(() => {
          this.loading.set(false)
          this.formErrorMessage.set('')
          this.toastService.success('Inscription réussie')
        }),
        catchError((error) => {
          if (error instanceof errors.ValidationError) {
            this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
            this.setErrors(error.getErrors())
            return of(error)
          }

          this.toastService.error('Erreur lors de la création du compte')

          console.error('Error:', error)
          return of(error)
        }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
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
