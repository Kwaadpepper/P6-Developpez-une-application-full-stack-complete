import SessionExpired from '@core/errors/SessionExpired'
import { EMPTY, MonoTypeOperatorFunction, ObservableInput, retry, RetryConfig, timer } from 'rxjs'

const retryConfig: RetryConfig = {
  count: 3,
  delay: (error: unknown, retryCount: number): ObservableInput<unknown> => {
    if (error instanceof SessionExpired) {
      return EMPTY
    }

    if (localStorage.getItem('loggedin') === null) {
      return EMPTY
    }

    // FIXME merge repo retry with session interceptor : need to refresh token before retry

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
