import { Injectable } from '@angular/core'
import { CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router } from '@angular/router'
import { redirectUrls } from '../app.routes'
import { SessionService } from '../core/services/session.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly redirectUrl = redirectUrls.login

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    console.log('AuthGuard#canActivate called', this.sessionService.isLoggedIn$())
    if (!this.sessionService.isLoggedIn$()) {
      const loginRoute = this.router.parseUrl(this.redirectUrl)

      return new RedirectCommand(loginRoute)
    }
    return true
  }
}
