import { NgIf } from '@angular/common'
import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core'
import { Router, RouterEvent, RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { DrawerModule } from 'primeng/drawer'
import { filter, Subject, takeUntil } from 'rxjs'

import { NavMenuComponent } from '@shared/index'
import { HeaderViewModel } from './header.viewmodel'

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
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly mobileBreakpoint = 640

  readonly onMobile = signal(false)
  readonly drawerVisible = signal(false)

  readonly displayHeader = signal(false)
  readonly isOnAuthPage = signal(false)

  private readonly endObservables = new Subject<true>()

  constructor(
    public viewModel: HeaderViewModel,
    private readonly router: Router,
  ) {
    router.events.pipe(
      filter(e => e instanceof RouterEvent))
      .pipe(takeUntil(this.endObservables))
      .subscribe((e: RouterEvent) => {
        this.displayHeader.set(!this.viewModel.isHomePage(e.url))
        this.isOnAuthPage.set(this.viewModel.isAuthPage(e.url))
      })
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'))
  }

  ngOnDestroy(): void {
    this.endObservables.next(true)
    this.endObservables.complete()
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number): void {
    // * Close the drawer if the width is greater than the mobile breakpoint
    // * and the drawer is visible
    if (width > this.mobileBreakpoint && this.drawerVisible()) {
      this.drawerVisible.set(false)
    }

    // * Set the onMobile signal to false if the width is greater than the mobile breakpoint
    if (width > this.mobileBreakpoint && this.onMobile()) {
      this.onMobile.set(false)
    }
    // * Set the onMobile signal to true if the width is less than the mobile breakpoint
    if (width <= this.mobileBreakpoint && !this.onMobile()) {
      this.onMobile.set(true)
    }
  }

  onShowDrawer(): void {
    this.drawerVisible.set(true)
  }

  onHideDrawer(): void {
    this.drawerVisible.set(false)
  }
}
