import { Injectable, signal } from '@angular/core'

import { PostService, TopicService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [PostService, TopicService],
})
export default class MarkdownEditorViewModel {
  public readonly errorMessage = signal<string>('')
  public readonly value = signal<string>('')

  public setValue(value: string): void {
    this.value.set(value)
  }

  public resetError(): void {
    this.errorMessage.set('')
  }

  public setError(message: string): void {
    this.errorMessage.set(message)
  }
}
