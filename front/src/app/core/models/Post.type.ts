import UUID from '../types/uuid.type'

export default interface Post {
  uuid: UUID
  name: string
  content: string
  authorUuid: UUID
  authorName: string
  createdAt: Date
  updatedAt?: Date
}
