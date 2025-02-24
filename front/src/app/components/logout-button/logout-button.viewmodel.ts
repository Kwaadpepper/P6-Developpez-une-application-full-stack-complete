import { Injectable } from '@angular/core'
import { AuthService } from '@core/services'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [AuthService],
})
export default class LogoutButtonViewModel {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  public logout(): Observable<void> {
    return this.authService.logout().pipe(
      map(() => undefined),
    )
  }
}
