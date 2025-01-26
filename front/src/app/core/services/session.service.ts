import { computed, Injectable, signal } from '@angular/core'

import User from '../models/Utilisateur.type'

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private user = signal<User | null>(null)
  private isLoggedIn = signal<boolean>(false)

  public isLoggedIn$ = computed(() => this.isLoggedIn())
  public loggedUser$ = computed(() => this.user())

  constructor() {
    if (this.hasLoggedIsStatusInPersistence()) {
      this.persistLoggedIsStatus()
    }
    else {
      this.removeLoggedInStatus()
    }
  }

  public setLoggedIn(): void {
    // this.user.set(user)
    this.persistLoggedIsStatus()
  }

  public setLoggedOut(): void {
    // this.user.set(null)
    this.removeLoggedInStatus()
  }

  private persistLoggedIsStatus(): void {
    this.isLoggedIn.set(true)
    localStorage.setItem('loggedin', '')
  }

  private removeLoggedInStatus(): void {
    this.isLoggedIn.set(false)
    localStorage.removeItem('loggedin')
  }

  private hasLoggedIsStatusInPersistence(): boolean {
    return localStorage.getItem('loggedin') !== null
  }
}
