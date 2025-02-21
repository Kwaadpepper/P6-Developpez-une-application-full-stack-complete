import { computed, Injectable, signal, WritableSignal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Comment, Post } from '@core/interfaces'

@Injectable()
export default class ShowViewModel {
  private post: WritableSignal<Post>
  private comments: WritableSignal<Comment[]> = signal([])

  public readonly post$ = computed(() => this.post())
  public readonly comments$ = computed(() => this.comments())

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    const activateRouteSnapshot = this.activatedRoute.snapshot
    const currentRoutePost = activateRouteSnapshot.data['post']

    this.post = signal(currentRoutePost)
  }
}
