import { z } from 'zod'

const topicNameSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1),
})

export type TopicNameZod = z.infer<typeof topicNameSchema>

export default topicNameSchema
