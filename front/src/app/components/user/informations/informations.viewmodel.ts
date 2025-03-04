import { Injectable, signal } from '@angular/core'
import { catchError, EMPTY, finalize, map, Observable, ObservableInput, of, Subject, switchMap } from 'rxjs'

import { AuthService, errors, ProfileService, ToastService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [AuthService, ToastService],
})
export class InformationsViewModel {
  public readonly formErrorMessage = signal('')
  public readonly errors = {
    email: signal(''),
    username: signal(''),
    password: signal(''),
  }

  public readonly email = signal('')
  public readonly username = signal('')
  public readonly password = signal('')

  public readonly loading = signal(false)
  public readonly hasRefreshedData = new Subject()

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
  ) {
  }

  /**
   * Refresh the user information
   *
   * @return  {Observable<void>}
   */
  public refreshUserInformation(): Observable<void> {
    this.loading.set(true)
    this.resetErrors()

    return this.profileService.getCurrentUserProfile()
      .pipe(
        map((profile) => {
          this.username.set(profile.name)
          this.email.set(profile.email)
          this.password.set('')
          this.hasRefreshedData.next(true)
          this.loading.set(false)
        }),
        catchError((error): ObservableInput<void> => {
          this.toastService.error('Erreur lors de la récupération des informations')
          console.error('Error:', error)
          return of(error)
        }),
        finalize(() => {
          this.loading.set(false)
        }),
      )
  }

  /**
   * Update the user information
   *
   * @return  {Observable<void>}
   */
  public updateUserInformation(): Observable<void> {
    this.loading.set(true)
    this.resetErrors()

    let profileUpdate = {
      email: this.email(),
      username: this.username(),
    }

    if (this.password()) {
      profileUpdate = {
        ...profileUpdate,
        ...{ password: this.password() },
      }
    }

    return this.profileService.updateUserProfile(profileUpdate).pipe(
      switchMap(() => this.refreshUserInformation()),
      catchError((error): ObservableInput<void> => {
        if (error instanceof errors.ValidationError) {
          this.formErrorMessage.set('Des champ n\'ont pas pu être validés')
          this.setErrors(error.getErrors())
          return EMPTY
        }

        this.toastService.error('Erreur lors de la mise à jour des informations')

        console.error('Error:', error)
        return EMPTY
      }),
      finalize(() => {
        this.loading.set(false)
      }),
    )
  }

  private resetErrors(): void {
    this.formErrorMessage.set('')
    Object.values(this.errors).forEach((error) => {
      error.set('')
    })
  }

  private setErrors(errors: Map<string, string>): void {
    this.errors.email.set(errors.get('email') ?? '')
    this.errors.username.set(errors.get('username') ?? '')
    this.errors.password.set(errors.get('password') ?? '')
  }
}
