import { Injectable, signal } from '@angular/core'
import { catchError, finalize, Observable, of, tap } from 'rxjs'

import { AuthService, errors, ToastService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [AuthService, ToastService],
})
export default class LoginViewModel {
  public readonly formErrorMessage = signal('')
  public readonly login = signal('login')
  public readonly password = signal('password')

  public readonly loading = signal(false)

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
  }

  public proceedToLogin(login: string, password: string): Observable<boolean> {
    this.loading.set(true)
    return this.authService.login({ login, password })
      .pipe(
        tap(() => {
          this.loading.set(false)
          this.formErrorMessage.set('')
          this.toastService.success('Connexion réussie')
        }),
        catchError((error) => {
          if (error instanceof errors.LoginFailure) {
            this.formErrorMessage.set('Identifiants incorrects')
            return of(error)
          }

          this.toastService.error('Erreur lors de la connexion')

          console.error('Error:', error)
          return of(error)
        }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
  }
}
