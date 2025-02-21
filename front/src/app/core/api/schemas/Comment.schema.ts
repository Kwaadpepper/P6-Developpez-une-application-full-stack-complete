import { z } from 'zod'

const commentSchema = z.object({
  uuid: z.string().uuid(),
  content: z.string().min(1),
  post_uuid: z.string().uuid(),
  author_uuid: z.string().uuid(),
  author_name: z.string().min(1),
  created_at: z.date({ coerce: true }),
  updated_at: z.date({ coerce: true }),
})

export type CommentZod = z.infer<typeof commentSchema>

export default commentSchema
