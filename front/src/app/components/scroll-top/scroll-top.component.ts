import { Component, HostListener, signal } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import ScrollTopViewModel from './scroll-top.viewmodel'

@Component({
  selector: 'app-scroll-top',
  imports: [
    ButtonModule,
  ],
  providers: [ScrollTopViewModel],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css',
})
export class ScrollTopComponent {
  readonly showButton = signal(false)

  onScrollTopClick(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  @HostListener('window:scroll')
  /**
     * Show the scroll top button when the page is scrolled down
     *
     * @return  {<void>}
     */
  onScroll(): void {
    if (window.scrollY > 250) {
      this.showButton.set(true)
      return
    }

    if (this.showButton()) {
      this.showButton.set(false)
    }
  }
}
