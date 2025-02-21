import { z } from 'zod'

const topicWithSubscriptionSchema = z.object({
  uuid: z.string().uuid(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  subscribed: z.coerce.boolean(),
  created_at: z.date({ coerce: true }),
  updated_at: z.date({ coerce: true }),
})

export type TopicWithSubscriptionZod = z.infer<typeof topicWithSubscriptionSchema>

export default topicWithSubscriptionSchema
