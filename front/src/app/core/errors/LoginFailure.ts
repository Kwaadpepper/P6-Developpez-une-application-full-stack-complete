export default class LoginFailure extends Error {
  public constructor() {
    super('Bad credentials')
  }
}
