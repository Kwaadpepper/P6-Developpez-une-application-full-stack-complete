import BadResponseFromServerError from '@core/errors/BadResponseFromServerError'
import LoginFailure from '@core/errors/LoginFailure'
import ValidationError from '@core/errors/ValidationError'
import { AuthService } from './auth/auth.service'
import { CommentService } from './comment/comment.service'
import { FeedService } from './feed/feed.service'
import { PostService } from './post/post.service'
import { ProfileService } from './profile/profile.service'
import { SessionService } from './session/session.service'
import { ToastService } from './toast/toast.service'
import { TopicService } from './topic/topic.service'

const errors = {
  BadResponseFromServerError,
  LoginFailure,
  ValidationError,
}

export {
  AuthService, CommentService, errors,
  FeedService, PostService, ProfileService, SessionService, ToastService,
  TopicService,
}
