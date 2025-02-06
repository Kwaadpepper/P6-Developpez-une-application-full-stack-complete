import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { first, Observable } from 'rxjs'

import { userSchema } from '@core/api/schemas'
import { User } from '@core/interfaces'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export default class UserRepository {
  private readonly mddEndpointUrl = environment.mddEndpointUrl
  private readonly profileUrl = `${this.mddEndpointUrl}/api/profile`

  private constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get the current user profile.
   * @returns The current user profile.
   */
  public getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(this.profileUrl, {
      withCredentials: true,
    }).pipe(
      verifyResponseType(userSchema),
      retryMultipleTimes(),
      first(),
    )
  }

  public updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(this.profileUrl, user, {
      withCredentials: true,
    }).pipe(
      verifyResponseType(userSchema),
      retryMultipleTimes(),
      first(),
    )
  }
}
