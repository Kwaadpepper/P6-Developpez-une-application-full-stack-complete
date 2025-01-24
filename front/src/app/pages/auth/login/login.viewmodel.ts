import { signal } from '@angular/core'

export default class LoginViewModel {
  public formErrorMessage = signal('')
  public login = signal('login')
  public password = signal('password')

  public clearFormErrorMessage(): void {
    this.formErrorMessage.set('')
  }

  public getFormErrorMessage(): string {
    return this.formErrorMessage()
  }
}
