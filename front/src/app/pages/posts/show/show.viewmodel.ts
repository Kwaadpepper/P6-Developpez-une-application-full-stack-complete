import { computed, Injectable, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Comment, Post } from '@core/interfaces'

@Injectable({
  providedIn: 'root',
  deps: [ActivatedRoute],
})
export default class ShowViewModel {
  private readonly _post: WritableSignal<Post>
  private readonly _comments: WritableSignal<Comment[]> = signal([])

  public readonly post = computed(() => this._post())
  public readonly comments = computed(() => this._comments())

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    const activateRouteSnapshot = this.activatedRoute.snapshot
    const currentRoutePost = activateRouteSnapshot.data['post']

    this._post = signal(currentRoutePost)
  }
}
