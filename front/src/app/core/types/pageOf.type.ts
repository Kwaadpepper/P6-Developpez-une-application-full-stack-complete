import Entity from '../models/Entity.type'

export default interface PageOf<T extends Entity> {
  list: T[]
  page: number
  totalPages: number
  totalItems: number
}
