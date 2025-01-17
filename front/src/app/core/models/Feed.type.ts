import UUID from '../types/uuid.type'
import Post from './Post.type'

export default interface Feed {
  uuid: UUID
  posts: Post[]
}
