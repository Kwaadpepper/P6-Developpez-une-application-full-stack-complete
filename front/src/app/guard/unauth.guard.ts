import { Injectable } from '@angular/core'
import { CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router } from '@angular/router'

import { SessionService } from '@core/services'
import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
})
/** This is used to make sure that a logged in user will stay within the protected routes */
export class UnauthGuard implements CanActivate {
  private readonly redirectUrl = redirectUrls.posts

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    // * If the user is logged in, redirect to the posts page
    if (this.sessionService.isLoggedIn()) {
      const loginRoute = this.router.parseUrl(this.redirectUrl)

      return new RedirectCommand(loginRoute)
    }

    // * If the user is not logged in, allow access
    return true
  }
}
