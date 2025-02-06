import { Component, Input } from '@angular/core'
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
  @Input({ required: true })
  public redirectUrl = ''

  @Input()
  public variant: Button['variant'] = 'outlined'

  @Input()
  public severity: Button['severity'] = 'contrast'

  @Input()
  public title = ''

  constructor(
    public viewModel: LogoutButtonViewModel,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  public onLogout(): void {
    this.viewModel.logout().then(() => {
      this.toastService.info('Vous êtes déconnecté')
      this.router.navigateByUrl(this.redirectUrl)
    }).catch((error) => {
      console.error('Error:', error)
      this.toastService.error('Erreur lors de la déconnexion')
    })
  }
}
