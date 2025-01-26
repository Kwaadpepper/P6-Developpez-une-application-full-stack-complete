import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, first, map, Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { verifyResponseType } from '../../lib/tools/verifyReponseType'
import LoginFailure from './api/errors/LoginFailure'
import simpleMessage, { SimpleMessage } from './api/schemas/SimpleMessage.schema'
import { SessionService } from './session.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mddEndpointUrl = environment.mddEndpointUrl
  private loginUrl = `${this.mddEndpointUrl}/api/auth/login`
  private logoutUrl = `${this.mddEndpointUrl}/api/auth/logout`

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }

  public login(login: string, password: string): Observable<SimpleMessage> {
    return this.http.post<SimpleMessage>(
      this.loginUrl,
      { login, password },
      {
        withCredentials: true,
      },
    ).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.sessionService.setLoggedOut()
          return throwError(() => new LoginFailure())
        }
        return throwError(() => error)
      }),
      verifyResponseType(simpleMessage),
      map((response) => {
        this.sessionService.setLoggedIn()
        return response
      }),
      first(),
    )
  }

  public logout(): Observable<SimpleMessage> {
    return this.http.post<SimpleMessage>(
      this.logoutUrl,
      { },
    ).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return throwError(() => new LoginFailure())
        }
        return throwError(() => error)
      }),
      verifyResponseType(simpleMessage),
      map((response) => {
        this.sessionService.setLoggedOut()
        return response
      }),
      first(),
    )
  }
}
