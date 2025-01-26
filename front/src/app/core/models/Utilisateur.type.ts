import Entity from './Entity.type'

export default interface User extends Entity {
  name: string
  email: string
  created_at: Date
  updated_at: Date
}
