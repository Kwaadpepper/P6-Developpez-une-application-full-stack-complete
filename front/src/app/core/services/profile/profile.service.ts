import { Injectable } from '@angular/core'
import { User } from '@core/interfaces'
import UserRepository from '@core/repositories/UserRepository.repository'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [UserRepository],
})
export class ProfileService {
  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  /**
   * Get the current user profile.
   * @returns The current user profile.
   */
  public getCurrentUserProfile(): Observable<User> {
    return this.userRepository.getCurrentUserProfile()
  }

  /**
   * Update the user profile.
   *
   * @param email  The email to update.
   * @param username  The username to update.
   * @param password  The password to update.
   * @returns  A message indicating the success of the operation.
   */
  public updateUserProfile({ email, username, password }: {
    email: string
    username: string
    password?: string
  }): Observable<void> {
    return this.userRepository.updateUserProfile({ email, username, password }).pipe(
      map(() => { return }),
    )
  }
}
