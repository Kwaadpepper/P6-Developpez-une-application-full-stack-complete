import { Injectable, signal } from '@angular/core'

import { AuthService, errors, ToastService } from '@core/services'
import { ProfileService } from '@core/services/profile/profile.service'
import { catchError, EMPTY, finalize, map, Observable, ObservableInput, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
  deps: [AuthService, ToastService],
})
export default class InformationsViewModel {
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

  public refreshUserInformation(): void {
    this.hasRefreshedData.next(true)
    this.profileService.getCurrentUserProfile().subscribe({
      next: (profile) => {
        this.username.set(profile.name)
        this.email.set(profile.email)
        this.password.set('')
      },
      error: (error) => {
        this.toastService.error('Erreur lors de la récupération des informations')
        console.error('Error:', error)
      },
      complete: () => {
        this.hasRefreshedData.next(true)
      },
    })
  }

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
      map(() => {
        this.refreshUserInformation()
      }),
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

  public resetErrors(): void {
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
