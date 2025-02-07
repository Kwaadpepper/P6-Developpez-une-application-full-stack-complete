import { Injectable, signal } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs'

import { redirectUrls } from '@routes'

@Injectable({
  providedIn: 'root',
  deps: [Router],
})
export default class HeaderViewModel {
  public readonly displayHeader = signal(false)
  public readonly isOnAuthPage = signal(false)

  constructor(
    private router: Router,
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
