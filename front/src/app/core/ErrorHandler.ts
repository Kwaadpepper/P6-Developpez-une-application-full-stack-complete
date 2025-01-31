import { Injectable, ErrorHandler as NgErrorHanlder } from '@angular/core'

import { Router } from '@angular/router'
import { BadResponseFromServerError, NotFoundError } from './errors'
import { ToastService } from './services/toast/toast.service'

@Injectable()
export class ErrorHandler implements NgErrorHanlder {
  constructor(
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) { }

  // NOTE: Forced type any from core/angular
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    if (error instanceof Error) {
      // ! Unmanaged error occured
      const message = `Sorry an error occured ${error?.message}`
      console.error(message)
      this.toastService.error(message)
    }
    if (error instanceof NotFoundError) {
      this.router.navigate(['/404'])
      return
    }
    if (error instanceof BadResponseFromServerError) {
      console.error(error)
    }
    console.debug(error)
  }
}
