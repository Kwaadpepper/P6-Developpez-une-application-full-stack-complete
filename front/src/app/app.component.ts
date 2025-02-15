import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ToastModule } from 'primeng/toast'

import { HeaderComponent } from './layout/header/header.component'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, HeaderComponent,
    ToastModule,
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

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
    })
    window.scrollTo(0, 0) // For Safari
  }
}
