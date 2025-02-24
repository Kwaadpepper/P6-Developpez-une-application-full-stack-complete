import { Component, input } from '@angular/core'
import { Router } from '@angular/router'
import { Button, ButtonModule } from 'primeng/button'

import { ToastService } from '@core/services'
import LogoutButtonViewModel from './logout-button.viewmodel'

@Component({
  selector: 'app-logout-button',
  imports: [ButtonModule],
  providers: [LogoutButtonViewModel],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  public redirectUrl = input.required<string>()
  public variant = input<Button['variant']>('outlined')
  public severity = input<Button['severity']>('contrast')
  public title = input<string>()

  constructor(
    public viewModel: LogoutButtonViewModel,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  public onLogout(): void {
    this.viewModel.logout()
      .subscribe({
        next: () => {
          this.toastService.info('Vous êtes déconnecté')
          this.router.navigateByUrl(this.redirectUrl())
        },
        error: (error) => {
          console.error('Error:', error)
          this.toastService.error('Erreur lors de la déconnexion')
        },
      })
  }
}
