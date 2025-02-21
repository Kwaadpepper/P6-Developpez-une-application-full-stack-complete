import { computed, Injectable } from '@angular/core'

import { SessionService } from '@core/services'

@Injectable({
  providedIn: 'root',
  deps: [SessionService],
})
export default class NavMenuViewModel {
  public readonly loggedIn = computed(() => this.sessionService.isLoggedIn())

  constructor(
    private readonly sessionService: SessionService,
  ) {
  }
}
