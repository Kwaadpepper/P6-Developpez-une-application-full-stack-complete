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

import { SessionExpired } from '@core/errors/SessionExpired'
import { AuthService, SessionService, ToastService } from '@core/services'
import { redirectUrls } from '@routes'

@Injectable({ providedIn: 'root' })
/**
  * This is used to manage the session of the user
  * It will :
  * - refresh the token if it is expired
  * - retry the request if the token is refreshed
  * - notify the user that he is logged out
  * - redirect the user to the login page if the session is expired
  * - also debounce the notification to avoid multiple notifications
  */
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
        // * If the token is expired, we refresh it
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.authService.refreshSession().pipe(
            // * If the refresh token fails, we logout the user
            catchError(() => {
              this.notifyForLogout.next(!wasLoginRequest)
              this.sessionService.setLoggedOut()
              this.rooter.navigateByUrl(this.redirectUrl)
              return throwError(() => new SessionExpired())
            }),
            // * If the refresh token is successful, we retry the request
            switchMap(() => next.handle(request)),
          )
        }
        // * If the error is not a 401, we return it
        return throwError(() => error)
      }),
      // * We stop the request when we receive the response
      takeWhile(event => !(event instanceof HttpResponse), true),
    )
  }
}
