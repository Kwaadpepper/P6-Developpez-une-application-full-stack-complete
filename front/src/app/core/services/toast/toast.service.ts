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

  /**
   * Show a toast message.
   * @param message The message to show.
   * @param summary The summary of the message.
   */
  public success(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: message,
    })
  }

  /**
   * Show a toast message.
   * @param message The message to show.
   * @param summary The summary of the message.
   */
  public info(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: message,
    })
  }

  /**
   * Show a toast message.
   * @param message The message to show.
   * @param summary The summary of the message.
   */
  public warning(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: message,
    })
  }

  /**
   * Show a toast message.
   * @param message The message to show.
   * @param summary The summary of the message.
   */
  public error(message: string, summary?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: message,
    })
  }
}
