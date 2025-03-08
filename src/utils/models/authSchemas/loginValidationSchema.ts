import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default loginValidationSchema
