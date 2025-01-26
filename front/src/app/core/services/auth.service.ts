import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, first, map, Observable, throwError } from 'rxjs'

import { environment } from '../../../environments/environment'
import User from '../models/Utilisateur.type'
import { verifyResponseType } from '../tools/verifyReponseType'
import LoginFailure from './api/errors/LoginFailure'
import simpleMessageSchema, { SimpleMessageZod } from './api/schemas/SimpleMessage.schema'
import userSchema, { UserZod } from './api/schemas/User.schema'
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

  public login(login: string, password: string): Observable<User> {
    return this.http.post<UserZod>(
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
      verifyResponseType(userSchema),
      map((user) => {
        this.sessionService.setLoggedIn(user)
        return user
      }),
      first(),
    )
  }

  public logout(): Observable<SimpleMessageZod> {
    return this.http.post<SimpleMessageZod>(
      this.logoutUrl,
      { },
    ).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return throwError(() => new LoginFailure())
        }
        return throwError(() => error)
      }),
      verifyResponseType(simpleMessageSchema),
      map((response) => {
        this.sessionService.setLoggedOut()
        return response
      }),
      first(),
    )
  }
}
