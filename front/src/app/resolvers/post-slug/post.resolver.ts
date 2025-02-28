import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router'
import { NotFoundError } from '@core/errors'
import { Post } from '@core/interfaces'
import { PostService } from '@core/services'
import { catchError, Observable, throwError } from 'rxjs'

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

    return this.postService.findPostBySlug(postSlug).pipe(
      catchError(() => {
        return throwError(() => new NotFoundError('Post not found'))
      }),
    )
  }
}
