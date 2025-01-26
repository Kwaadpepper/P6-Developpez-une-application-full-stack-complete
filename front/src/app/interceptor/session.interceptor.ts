import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { debounceTime, Observable, Subject } from 'rxjs'
import { redirectUrls } from '../app.routes'
import { SessionService } from '../core/services/session.service'
import { ToastService } from '../core/services/toast.service'

@Injectable({ providedIn: 'root' })
export class SessionInterceptor implements HttpInterceptor {
  private notifyForLogout = new Subject<boolean>()
  private readonly debounceTimeMs = 300
  private readonly redirectUrl = redirectUrls.login

  constructor(
    private rooter: Router,
    private sessionService: SessionService,
    private toastService: ToastService,
  ) {
    this.notifyForLogout.pipe(
      debounceTime(this.debounceTimeMs),
    ).subscribe((notifyForLogout) => {
      if (notifyForLogout) {
        this.toastService.info('Vous êtes déconnecté')
      }
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const wasLoginRequest = request.url.endsWith('login') === true
    const response = next.handle(request)

    response.subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notifyForLogout.next(!wasLoginRequest)
          this.sessionService.setLoggedOut()
          this.rooter.navigateByUrl(this.redirectUrl)
        }
      },
    })

    return response
  }
}
