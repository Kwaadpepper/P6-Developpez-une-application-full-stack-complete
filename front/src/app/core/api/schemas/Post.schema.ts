import { z } from 'zod'

const postSchema = z.object({
  uuid: z.string().uuid(),
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  topic_uuid: z.string().uuid(),
  author_uuid: z.string().uuid(),
  author_name: z.string().min(1),
  created_at: z.date({ coerce: true }),
  updated_at: z.date({ coerce: true }),
})

export type PostZod = z.infer<typeof postSchema>

export default postSchema
