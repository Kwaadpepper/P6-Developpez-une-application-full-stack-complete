import { ValidationError } from '@core/errors'
import { SessionExpired } from '@core/errors/SessionExpired'
import { EMPTY, MonoTypeOperatorFunction, ObservableInput, retry, RetryConfig, throwError, timer } from 'rxjs'

const retryConfig: RetryConfig = {
  count: 3,
  delay: (error: unknown, retryCount: number): ObservableInput<unknown> => {
    if (error instanceof SessionExpired) {
      return throwError(() => error)
    }

    if (error instanceof ValidationError) {
      return throwError(() => error)
    }

    if (retryCount < 3) {
      return timer(1000)
    }

    return EMPTY
  },
  resetOnSuccess: true,
}

export default function retryMultipleTimes<T>(): MonoTypeOperatorFunction<T> {
  return retry<T>(retryConfig)
}
