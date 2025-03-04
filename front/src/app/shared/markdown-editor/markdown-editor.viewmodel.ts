import { computed, Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MarkdownEditorViewModel {
  public readonly errorMessage = signal<string>('')
  public readonly _value = signal<string>('')
  public readonly value = computed<string>(() => this._value().length > 0 ? this._value() : 'Aucun contenu saisi')

  /** Set the markdown content */
  public setValue(value: string): void {
    this._value.set(value)
  }

  /** Reset the component error message */
  public resetError(): void {
    this.errorMessage.set('')
  }

  /** Set the component error message */
  public setErrorMessage(message: string): void {
    this.errorMessage.set(message)
  }
}
