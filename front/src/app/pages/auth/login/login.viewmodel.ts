import { Injectable, signal } from '@angular/core'
import { AuthService, errors, ToastService } from '../../../core/services'

@Injectable({ providedIn: 'platform' })
export default class LoginViewModel {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
  }

  public formErrorMessage = signal('')
  public login = signal('login')
  public password = signal('password')

  public proceedToLogin(
    login: string, password: string,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.login(
        login, password,
      ).subscribe({
        complete: () => {
          this.formErrorMessage.set('')
          this.toastService.success('Connexion réussie')
          resolve(true)
        },
        error: (error) => {
          if (error instanceof errors.LoginFailure) {
            this.formErrorMessage.set('Identifiants incorrects')
            return
          }

          this.toastService.error('Erreur lors de la connexion')

          console.error('Error:', error)
          reject(error)
        },
      })
    })
  }
}
