import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Button } from 'primeng/button'

@Component({
  selector: 'app-back-button',
  imports: [Button],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css',
})
export class BackButtonComponent {
  @Input({ required: true })
  public backUrl = ''

  constructor(private router: Router) {
  }

  public goBack(url: string): void {
    this.router.navigateByUrl(url)
  }

  public onGoBackLink(): void {
    this.goBack(this.backUrl)
  }
}
