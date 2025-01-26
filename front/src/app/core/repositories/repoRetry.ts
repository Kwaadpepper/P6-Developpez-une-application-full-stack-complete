import { MonoTypeOperatorFunction, retry, RetryConfig } from 'rxjs'
const retryConfig: RetryConfig = {
  count: 3,
  delay: 500,
  resetOnSuccess: true,
}

export default function retryMultipleTimes<T>(): MonoTypeOperatorFunction<T> {
  return retry<T>(retryConfig)
}
