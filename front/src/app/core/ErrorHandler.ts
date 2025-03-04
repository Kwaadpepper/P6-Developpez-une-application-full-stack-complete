import { Injectable, ErrorHandler as NgErrorHanlder } from '@angular/core'

import { Router } from '@angular/router'
import { NotFoundError } from './errors'
import { SessionExpired } from './errors/SessionExpired'
import { ToastService } from './services/toast/toast.service'

@Injectable()
/**
   * This allows to manage errors in a centralized way
   */
export class ErrorHandler implements NgErrorHanlder {
  constructor(
    private readonly toastService: ToastService,
    private readonly router: Router,
  ) { }

  // NOTE: Forced type any from core/angular
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    if (error instanceof NotFoundError) {
      this.router.navigateByUrl('/404')
      return
    }

    if (error instanceof SessionExpired) {
      this.router.navigateByUrl('/login')
      return
    }

    if (error instanceof Error) {
      // ! Unmanaged error occured
      const message = `Sorry an error occured ${error?.message}`
      console.error(message)
      this.toastService.error(message)
    }
    console.debug(error)
  }
}
