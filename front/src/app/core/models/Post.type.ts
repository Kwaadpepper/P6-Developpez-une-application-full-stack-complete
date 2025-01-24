import UUID from '../types/uuid.type'

export default interface Post {
  uuid: UUID
  slug: string
  title: string
  content: string
  topic_uuid: UUID
  author_uuid: UUID
  author_name: string
  created_at: Date
  updated_at?: Date
}
