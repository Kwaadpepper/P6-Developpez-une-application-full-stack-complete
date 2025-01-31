import UUID from '../types/uuid.type'
import Entity from './Entity.interface'

export default interface Post extends Entity {
  slug: string
  title: string
  /** Markdown content */
  content: string
  topic_uuid: UUID
  author_uuid: UUID
  author_name: string
  created_at: Date
  updated_at?: Date
}
