import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import UpdateProfileRequest from '@core/api/requests/updateUserProfile.request'
import { simpleMessageSchema, SimpleMessageZod, userSchema } from '@core/api/schemas'
import { User } from '@core/interfaces'
import { checkServerReponse } from '@core/tools/checkServerReponse'
import { verifyResponseType } from '@core/tools/verifyReponseType'
import { environment } from '@env/environment'
import retryMultipleTimes from './repoRetry'

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
})
export class UserRepository {
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
    )
  }

  /**
   * Update the user profile.
   *
   * @param request  The request to update the user profile.
   * @returns  A message indicating the success of the operation.
   */
  public updateUserProfile(request: UpdateProfileRequest): Observable<SimpleMessageZod> {
    return this.http.put<SimpleMessageZod>(this.profileUrl, request, {
      withCredentials: true,
    }).pipe(
      checkServerReponse(),
      verifyResponseType(simpleMessageSchema),
      retryMultipleTimes(),
    )
  }
}
