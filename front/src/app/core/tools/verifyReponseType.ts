import { catchError, map, Observable, pipe, throwError, UnaryFunction } from 'rxjs'
import { z, ZodError } from 'zod'

import BadResponseFromServerError from '@core/api/errors/BadResponseFromServerError'

export function verifyResponseType<T extends z.ZodTypeAny>(zodObj: T): UnaryFunction<Observable<unknown>, Observable<z.infer<T>>> {
  return pipe(
    map((response) => {
      return zodObj.parse(response)
    }),
    catchError((error) => {
      if (error instanceof ZodError) {
        return throwError(() => new BadResponseFromServerError(error))
      }
      return throwError(() => error)
    }),
  )
}
