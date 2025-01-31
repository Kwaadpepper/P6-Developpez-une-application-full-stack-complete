import { HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, pipe, throwError, UnaryFunction } from 'rxjs'

import validationErrorSchema from '@core/api/schemas/ValidationError.schema'
import ValidationError from '@core/errors/ValidationError'

export function checkServerReponse<T>(): UnaryFunction<Observable<T>, Observable<T>> {
  return pipe(
    catchError((error) => {
      if (!(error instanceof HttpErrorResponse)) {
        throw new Error(`Cannot check server reponse if not a HttpErrorResponse`, error)
      }
      if (error.status === 422) {
        const errors = validationErrorSchema.parse(error.error)
        throw new ValidationError(errors.errors)
      }
      return throwError(() => error)
    }),
  )
}
