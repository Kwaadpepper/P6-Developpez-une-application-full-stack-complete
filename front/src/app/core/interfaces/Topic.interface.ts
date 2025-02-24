import Entity from './Entity.interface'

export default interface Topic extends Entity {
  slug: string
  name: string
  description: string
  created_at: Date
  updated_at?: Date
}
