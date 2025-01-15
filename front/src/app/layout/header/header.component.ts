import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs'

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  displayHeader = false

  constructor(private router: Router) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.displayHeader = !this.isHomePage(e)
      })
  }

  private isHomePage(e: RouterEvent): boolean {
    return e.url === '/'
  }
}
