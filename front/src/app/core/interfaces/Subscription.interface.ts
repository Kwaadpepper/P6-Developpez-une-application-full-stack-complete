import UUID from '../types/uuid.type'
import Entity from './Entity.interface'

export default interface Subscription extends Entity {
  userUuid: UUID
  topicUuid: UUID
}
