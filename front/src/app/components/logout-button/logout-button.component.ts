import { NgIf } from '@angular/common'
import { Component, computed, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Button, ButtonModule } from 'primeng/button'
import { AuthService } from '../../core/services/auth.service'
import { SessionService } from '../../core/services/session.service'
import { ToastService } from '../../core/services/toast.service'

@Component({
  selector: 'app-logout-button',
  imports: [ButtonModule, NgIf],
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

  public isLoggedIn$ = computed(() => this.sessionService.isLoggedIn$())

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private toastService: ToastService,
  ) {
  }

  public onLogout(): void {
    this.authService.logout().subscribe({
      complete: () => {
        this.toastService.info('Vous êtes déconnecté')
        this.router.navigateByUrl(this.redirectUrl)
      },
      error: (error) => {
        console.error('Error:', error)
        this.toastService.error('Erreur lors de la déconnexion')
      },
    })
  }
}
