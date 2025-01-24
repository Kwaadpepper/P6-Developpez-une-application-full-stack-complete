import { z } from 'zod'

const simpleMessage = z.object({
  message: z.string(),
})

export type SimpleMessage = z.infer<typeof simpleMessage>

export default simpleMessage
