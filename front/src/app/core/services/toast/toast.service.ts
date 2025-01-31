import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
  deps: [MessageService],
})
export class ToastService {
  constructor(
    private messageService: MessageService,
  ) { }

  public success(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: message,
    })
  }

  public info(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: message,
    })
  }

  public error(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: message,
    })
  }
}
