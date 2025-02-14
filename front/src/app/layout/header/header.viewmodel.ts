import { computed, Injectable, signal } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs'

import { SessionService } from '@core/services'
import { environment } from '@env/environment'
import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
  deps: [Router, SessionService],
})
export default class HeaderViewModel {
  public readonly appName = signal(environment.appName)
  public readonly displayHeader = signal(false)
  public readonly isOnAuthPage = signal(false)

  public readonly loggedIn = computed(() => this.sessionService.isLoggedIn())

  constructor(
    private readonly router: Router,
    private readonly sessionService: SessionService,
  ) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.displayHeader.set(!this.isHomePage(e))
        this.isOnAuthPage.set(this.isAuthPage(e))
      })
  }

  private isHomePage(e: RouterEvent): boolean {
    return e.url === redirectUrls.home
  }

  private isAuthPage(e: RouterEvent): boolean {
    return e.url === redirectUrls.login || e.url === redirectUrls.register
  }
}
