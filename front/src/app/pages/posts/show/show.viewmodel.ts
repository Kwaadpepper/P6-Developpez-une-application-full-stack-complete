import { computed, Injectable, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Post } from '@core/interfaces'

@Injectable({
  providedIn: 'root',
  deps: [ActivatedRoute],
})
export default class ShowViewModel {
  private readonly _post: WritableSignal<Post>

  public readonly post = computed(() => this._post())

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    const activateRouteSnapshot = this.activatedRoute.snapshot
    const currentRoutePost = activateRouteSnapshot.data['post']

    this._post = signal(currentRoutePost)
  }
}
