import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import PrimeNgTheme from '@primeng/themes/nora'
import { PrimeNG } from 'primeng/config'
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
  constructor(private primeng: PrimeNG) {
    this.primeng.theme.set({
      preset: PrimeNgTheme,
      options: {
        cssLayer: {
          name: 'primeng',
          order: 'tailwind-base, primeng, tailwind-utilities',
        },
      },
    })
  }
}
