import UUID from '../types/uuid.type'

export default interface Subscription {
  uuid: UUID
  userUuid: UUID
  topicUuid: UUID
}
