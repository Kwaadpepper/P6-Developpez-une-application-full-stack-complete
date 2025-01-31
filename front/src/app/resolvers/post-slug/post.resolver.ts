import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router'
import { NotFoundError } from '@core/errors'
import { Post } from '@core/interfaces'
import { PostService } from '@core/services'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    const postSlug = String(route.params['post'] ?? '')

    if (postSlug.length === 0) {
      throw new NotFoundError('Post not found')
    }

    return new Observable<Post>((subscriber) => {
      this.postService.findPostBySlug(postSlug).then((post) => {
        subscriber.next(post)
        subscriber.complete()
      }).catch(() => {
        throw new NotFoundError('Post not found')
      })
    })
  }
}
