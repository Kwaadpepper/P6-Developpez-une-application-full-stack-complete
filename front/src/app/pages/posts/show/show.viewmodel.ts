import { computed, Injectable, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Post } from '@core/interfaces'

@Injectable()
export default class ShowViewModel {
  private post: WritableSignal<Post>

  public readonly post$ = computed(() => this.post())

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    const activateRouteSnapshot = this.activatedRoute.snapshot
    const currentRoutePost = activateRouteSnapshot.data['post']

    console.log(activateRouteSnapshot)

    this.post = signal(currentRoutePost)
  }
}
