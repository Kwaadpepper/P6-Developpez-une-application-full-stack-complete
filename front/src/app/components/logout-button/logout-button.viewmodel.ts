import { Injectable } from '@angular/core'
import { AuthService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [AuthService],
})
export default class LogoutButtonViewModel {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  public logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.logout().subscribe({
        complete: () => {
          resolve()
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  }
}
