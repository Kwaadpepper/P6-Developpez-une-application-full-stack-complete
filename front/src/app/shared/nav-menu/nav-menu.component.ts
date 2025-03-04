import { NgClass, NgIf } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'

import { NavMenuViewModel } from './nav-menu.viewmodel'

@Component({
  selector: 'app-nav-menu',
  imports: [
    NgIf, RouterModule,
    NgClass, ButtonModule,
  ],
  providers: [NavMenuViewModel],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  readonly verticalDisplay = input(false, {
    transform: (v: string | boolean) => v === false ? false : true,
  })

  readonly closedMenu = output<boolean>()

  constructor(
    readonly viewModel: NavMenuViewModel,
  ) {
  }

  onCloseMenu(): void {
    this.closedMenu.emit(true)
  }
}
