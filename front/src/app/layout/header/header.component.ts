import { NgIf } from '@angular/common'
import { Component, computed } from '@angular/core'
import { Router, RouterEvent, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { filter } from 'rxjs'

import { redirectUrls } from '../../app.routes'
import { LogoutButtonComponent } from '../../components/logout-button/logout-button.component'

@Component({
  selector: 'app-header',
  imports: [
    NgIf, ButtonModule,
    RouterModule, LogoutButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  displayHeader = false
  isOnAuthPage = false

  public logoutUrl$ = computed(() => redirectUrls.login)

  constructor(private router: Router) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.displayHeader = !this.isHomePage(e)
        this.isOnAuthPage = this.isAuthPage(e)
      })
  }

  private isHomePage(e: RouterEvent): boolean {
    return e.url === '/'
  }

  private isAuthPage(e: RouterEvent): boolean {
    return e.url === '/login' || e.url === '/register'
  }
}
