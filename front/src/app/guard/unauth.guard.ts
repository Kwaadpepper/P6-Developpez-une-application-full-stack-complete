import { Injectable } from '@angular/core'
import { CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router } from '@angular/router'

import { SessionService } from '@core/services'
import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  private readonly redirectUrl = redirectUrls.posts

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    if (this.sessionService.isLoggedIn$()) {
      const loginRoute = this.router.parseUrl(this.redirectUrl)

      return new RedirectCommand(loginRoute)
    }
    return true
  }
}
