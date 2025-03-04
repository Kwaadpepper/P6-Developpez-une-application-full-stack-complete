import { z } from 'zod'

import { zSchema } from '@core/types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function pageOf<T extends zSchema>(schema: T) {
  return z.object({
    list: z.array(schema),
    page: z.number().min(1),
    totalPages: z.number().min(0),
    totalItems: z.number().min(0),
  })
}
