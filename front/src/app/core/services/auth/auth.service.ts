import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, first, map, Observable, throwError } from 'rxjs'

import LoginRequest from '@core/api/requests/login.request'
import RegisterRequest from '@core/api/requests/register.request'
import { simpleMessageSchema, SimpleMessageZod, userSchema, UserZod } from '@core/api/schemas'
import { LoginFailure } from '@core/errors/LoginFailure'
import { User } from '@core/interfaces'
import { checkServerReponse } from '@core/tools/checkServerReponse'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { environment } from '@env/environment'
import { SessionService } from '../session/session.service'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient, SessionService],
})
export class AuthService {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly loginUrl = `${this.mddEndpointUrl}/api/auth/login`
  private readonly refreshUrl = `${this.mddEndpointUrl}/api/auth/refresh-token`
  private readonly registerUrl = `${this.mddEndpointUrl}/api/auth/register`
  private readonly logoutUrl = `${this.mddEndpointUrl}/api/auth/logout`

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }

  /**
   * Login user with login and password and so return the user.
   * Cookies are used to store the session.
   * @param login with login and password.
   * @returns the user logged in.
   */
  public login(login: LoginRequest): Observable<User> {
    return this.http.post<UserZod>(
      this.loginUrl,
      login,
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

  /**
   * Refresh the session and so return a simple message.
   * @returns a simple message.
   */
  public refreshSession(): Observable<SimpleMessageZod> {
    return this.http.post<SimpleMessageZod>(
      this.refreshUrl,
      {},
      {
        withCredentials: true,
      },
    ).pipe(
      verifyResponseType(simpleMessageSchema),
    )
  }

  /**
   * Register user with email, username and password and so return the user.
   * Cookies are used to store the session, User is logged in after registration.
   * @param register with email, username and password.
   * @returns the user registered.
   */
  public register(register: RegisterRequest): Observable<User> {
    return this.http.post<UserZod>(
      this.registerUrl,
      register,
      {
        withCredentials: true,
      },
    ).pipe(
      checkServerReponse(),
      verifyResponseType(userSchema),
      map((user) => {
        this.sessionService.setLoggedIn(user)
        return user
      }),
      first(),
    )
  }

  /**
   * Logout the user and so return a simple message.
   * Removes the session from the cookies.
   * @returns a simple message.
   */
  public logout(): Observable<SimpleMessageZod> {
    return this.http.post<SimpleMessageZod>(
      this.logoutUrl,
      {},
      {
        withCredentials: true,
      },
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
