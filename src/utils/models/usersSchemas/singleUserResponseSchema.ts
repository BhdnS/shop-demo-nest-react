import { z } from 'zod'

const singleUserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
})

export default singleUserResponseSchema
