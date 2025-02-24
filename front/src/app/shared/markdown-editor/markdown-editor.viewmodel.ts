import { computed, Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export default class MarkdownEditorViewModel {
  public readonly errorMessage = signal<string>('')
  public readonly _value = signal<string>('')
  public readonly value = computed<string>(() => this._value().length > 0 ? this._value() : 'Aucun contenu saisi')

  public setValue(value: string): void {
    this._value.set(value)
  }

  public resetError(): void {
    this.errorMessage.set('')
  }

  public setErrorMessage(message: string): void {
    this.errorMessage.set(message)
  }
}
