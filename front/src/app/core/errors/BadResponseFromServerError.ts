export class BadResponseFromServerError extends Error {
  public override name = 'BadResponseFromServerError'

  constructor(cause?: unknown) {
    super('Bad response from server', { cause: cause })
  }
}
