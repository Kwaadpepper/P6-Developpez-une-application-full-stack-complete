import { z } from 'zod'

const topicSchema = z.object({
  uuid: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  created_at: z.date({ coerce: true }),
  updated_at: z.date({ coerce: true }),
})

export type TopicZod = z.infer<typeof topicSchema>

export default topicSchema
