import { UUID } from '@core/types'
import Entity from './Entity.interface'

export default interface Comment extends Entity {
  content: string
  post_uuid: UUID
  author_uuid: UUID
  author_name: string
  created_at: Date
  updated_at?: Date
}
