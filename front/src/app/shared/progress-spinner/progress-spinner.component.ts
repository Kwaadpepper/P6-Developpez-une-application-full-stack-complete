import { NgIf } from '@angular/common'
import { Component, input } from '@angular/core'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-progress-spinner',
  imports: [
    ProgressSpinnerModule,
    NgIf,
  ],
  template: '<p-progressSpinner *ngIf="visible()" role="status" class="w-7 h-7" strokeWidth="8" fill="transparent" animationDuration=".5s"><span class="visually-hidden">Chargement...</span></p-progressSpinner>',
})
export class ProgressSpinnerComponent {
  public readonly visible = input.required<boolean>()
}
