import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, debounceTime, Observable, Subject, switchMap, takeWhile, throwError } from 'rxjs'

import SessionExpired from '@core/errors/SessionExpired'
import { AuthService, SessionService, ToastService } from '@core/services'
import { redirectUrls } from '@routes'

@Injectable({ providedIn: 'root' })
export class SessionInterceptor implements HttpInterceptor {
  private notifyForLogout = new Subject<boolean>()
  private readonly debounceTimeMs = 1000
  private readonly redirectUrl = redirectUrls.login

  constructor(
    private rooter: Router,
    private authService: AuthService,
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
    const wasRefreshRequest = request.url.endsWith('refresh-token') === true

    // * Ignore some requests
    if (wasLoginRequest || wasRefreshRequest) {
      return next.handle(request)
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.authService.refreshSession().pipe(
            catchError(() => {
              this.notifyForLogout.next(!wasLoginRequest)
              this.sessionService.setLoggedOut()
              this.rooter.navigateByUrl(this.redirectUrl)
              return throwError(() => new SessionExpired())
            }),
            switchMap(() => next.handle(request)),
          )
        }
        return throwError(() => error)
      }),
      takeWhile(event => !(event instanceof HttpResponse), true),
    )
  }
}
