import { z } from 'zod'

const userSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  created_at: z.date({ coerce: true }),
  updated_at: z.date({ coerce: true }),
})

export type UserZod = z.infer<typeof userSchema>

export default userSchema
