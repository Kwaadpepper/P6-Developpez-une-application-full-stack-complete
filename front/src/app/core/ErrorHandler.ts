import { Injectable, ErrorHandler as NgErrorHanlder } from '@angular/core'

import BadResponseFromServerError from './api/errors/BadResponseFromServerError'
import { ToastService } from './services/toast/toast.service'

@Injectable()
export class ErrorHandler implements NgErrorHanlder {
  constructor(private toastService: ToastService) {}

  // NOTE: Forced type any from core/angular
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    if (error instanceof Error) {
      // ! Unmanaged error occured
      const message = `Sorry an error occured ${error?.message}`
      console.error(message)
      this.toastService.error(message)
    }
    if (error instanceof BadResponseFromServerError) {
      console.error(error)
    }
    console.debug(error)
  }
}
