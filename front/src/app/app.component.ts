import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ToastModule } from 'primeng/toast'

import { ScrollTopComponent } from './components'
import { HeaderComponent } from './layout/header/header.component'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    ToastModule,
    ScrollTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  onActivate(): void {
    this.scrollToTop()
  }

  onAttach(): void {
    this.scrollToTop()
  }

  /**
   * Scrolls the window to the top.
   */
  private scrollToTop(): void {
    if (window.scroll) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
    else {
      window.scrollTo(0, 0) // For Safari
    }
  }
}
