import { NgIf } from '@angular/common'
import { Component, HostListener, OnInit, signal } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { DrawerModule } from 'primeng/drawer'

import { NavMenuComponent } from '@shared/index'
import HeaderViewModel from './header.viewmodel'

@Component({
  selector: 'app-header',
  imports: [
    NgIf, ButtonModule,
    DrawerModule,
    RouterModule,
    NavMenuComponent,
  ],
  providers: [HeaderViewModel],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private readonly mobileBreakpoint = 640
  onMobile = signal(false)
  drawerVisible = signal(false)

  constructor(
    public viewModel: HeaderViewModel,
  ) {
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'))
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number): void {
    if (width > this.mobileBreakpoint && this.drawerVisible()) {
      this.drawerVisible.set(false)
    }
    if (width > this.mobileBreakpoint && this.onMobile()) {
      this.onMobile.set(false)
    }
    if (width <= this.mobileBreakpoint && !this.onMobile()) {
      this.onMobile.set(true)
    }
  }

  onShowDrawer(): void {
    this.drawerVisible.set(true)
  }

  onHideDrawer(): void {
    console.log('hide drawer')
    this.drawerVisible.set(false)
  }
}
