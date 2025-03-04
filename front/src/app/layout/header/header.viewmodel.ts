import { computed, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'

import { SessionService } from '@core/services'
import { environment } from '@env/environment'
import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
  deps: [Router, SessionService],
})
export class HeaderViewModel {
  public readonly appName = signal(environment.appName)

  public readonly loggedIn = computed(() => this.sessionService.isLoggedIn())

  constructor(
    private readonly sessionService: SessionService,
  ) {
  }

  public isHomePage(url: string): boolean {
    return url === redirectUrls.home
  }

  public isAuthPage(url: string): boolean {
    return url === redirectUrls.login || url === redirectUrls.register
  }
}
