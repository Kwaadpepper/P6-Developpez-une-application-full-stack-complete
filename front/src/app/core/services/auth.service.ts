import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, first, map, Observable, throwError } from 'rxjs'

import { environment } from '../../../environments/environment'
import User from '../interfaces/Utilisateur.interface'
import { checkServerReponse } from '../tools/checkServerReponse'
import { verifyResponseType } from '../tools/verifyReponseType'
import LoginFailure from './api/errors/LoginFailure'
import simpleMessageSchema, { SimpleMessageZod } from './api/schemas/SimpleMessage.schema'
import userSchema, { UserZod } from './api/schemas/User.schema'
import { SessionService } from './session.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly loginUrl = `${this.mddEndpointUrl}/api/auth/login`
  private readonly registerUrl = `${this.mddEndpointUrl}/api/auth/register`
  private readonly logoutUrl = `${this.mddEndpointUrl}/api/auth/logout`

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) { }

  /**
   * Login user with login and password and so return the user.
   * Cookies are used to store the session.
   * @param login as non empty string.
   * @param password as non empty string.
   * @returns the user logged in.
   */
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

  /**
   * Register user with email, username and password and so return the user.
   * Cookies are used to store the session, User is logged in after registration.
   * @param email as non empty string.
   * @param username as non empty string.
   * @param password as non empty string.
   * @returns the user registered.
   */
  public register(email: string, username: string, password: string): Observable<User> {
    return this.http.post<UserZod>(
      this.registerUrl,
      { email, username, password },
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
