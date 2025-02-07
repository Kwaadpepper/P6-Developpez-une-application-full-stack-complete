import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'

import HeaderViewModel from './header.viewmodel'

@Component({
  selector: 'app-header',
  imports: [
    NgIf, ButtonModule,
    RouterModule,
  ],
  providers: [HeaderViewModel],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public viewModel: HeaderViewModel,
  ) {
  }
}
