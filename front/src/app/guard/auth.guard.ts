import { Injectable } from '@angular/core'
import { CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router } from '@angular/router'

import { SessionService } from '@core/services'
import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
})
/** This is used to prevent non logged in user to access protected routes */
export class AuthGuard implements CanActivate {
  private readonly redirectUrl = redirectUrls.login

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    // * If the user is not logged in, redirect to the login page
    if (!this.sessionService.isLoggedIn()) {
      const loginRoute = this.router.parseUrl(this.redirectUrl)

      return new RedirectCommand(loginRoute)
    }

    // * If the user is logged in, allow access
    return true
  }
}
