import Entity from './Entity.interface'

export default interface TopicWithSubscription extends Entity {
  slug: string
  name: string
  description: string
  subscribed: boolean
  created_at: Date
  updated_at?: Date
}
