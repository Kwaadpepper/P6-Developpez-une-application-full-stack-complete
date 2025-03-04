import { Injectable, signal } from '@angular/core'

import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root',
})
export class HomeViewModel {
  public readonly appName = signal(environment.appName)
}
