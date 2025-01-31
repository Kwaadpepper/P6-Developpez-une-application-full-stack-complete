import BadResponseFromServerError from '@core/api/errors/BadResponseFromServerError'
import LoginFailure from '@core/api/errors/LoginFailure'
import ValidationError from '@core/api/errors/ValidationError'
import { PostService } from '@core/services/post/post.service'
import { AuthService } from './auth/auth.service'
import { FeedService } from './feed/feed.service'
import { SessionService } from './session/session.service'
import { ToastService } from './toast/toast.service'
import { TopicService } from './topic/topic.service'

const errors = {
  BadResponseFromServerError,
  LoginFailure,
  ValidationError,
}

export {
  AuthService, errors,
  FeedService, PostService,
  SessionService, ToastService,
  TopicService,
}
