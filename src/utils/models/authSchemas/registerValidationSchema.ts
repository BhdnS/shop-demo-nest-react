import { z } from 'zod'

const registerValidationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
})

export default registerValidationSchema
