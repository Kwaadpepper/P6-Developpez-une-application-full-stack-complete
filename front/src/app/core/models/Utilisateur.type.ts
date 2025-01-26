import UUID from '../types/uuid.type'

export default interface User {
  uuid: UUID
  name: string
  email: string
  created_at: Date
  updated_at: Date
}
