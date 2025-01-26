import { catchError, map, Observable, pipe, throwError, UnaryFunction } from 'rxjs'
import { z, ZodError } from 'zod'
import BadResponseFromServerError from '../../core/services/api/errors/BadResponseFromServerError'

export function verifyResponseType<T extends z.ZodTypeAny>(zodObj: T): UnaryFunction<Observable<unknown>, Observable<z.infer<T>>> {
  return pipe(
    map((response) => {
      return zodObj.parse(response)
    }),
    catchError((error) => {
      if (error instanceof ZodError) {
        console.error('Failure to validate reponse from SERVER:', error)
        return throwError(() => new BadResponseFromServerError(error))
      }
      return throwError(() => error)
    }),
  )
}
