import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterEvent, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { filter } from 'rxjs'

@Component({
  selector: 'app-header',
  imports: [NgIf, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  displayHeader = false
  isOnAuthPage = false

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
