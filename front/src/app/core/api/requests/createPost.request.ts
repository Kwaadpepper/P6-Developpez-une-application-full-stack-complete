import { UUID } from '@core/types'

export default interface CreatePost {
  title: string
  content: string
  topic: UUID
}
