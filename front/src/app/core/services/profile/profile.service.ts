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

  public getCurrentUserProfile(): Observable<User> {
    return this.userRepository.getCurrentUserProfile()
  }

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
