import BadResponseFromServerError from './api/errors/BadResponseFromServerError'
import LoginFailure from './api/errors/LoginFailure'
import simpleMessage from './api/schemas/SimpleMessage.schema'
import { AuthService } from './auth.service'
import { FeedService } from './feed.service'
import { SessionService } from './session.service'
import { ToastService } from './toast.service'

const errors = {
  BadResponseFromServerError,
  LoginFailure,
}

const schema = {
  simpleMessage,
}

export {
  AuthService, errors,
  FeedService, schema,
  SessionService, ToastService,
}
