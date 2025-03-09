import { z } from 'zod'

const createProductSchema = z.object({
  title: z.string(),
  price: z.number().min(0),
  description: z.string(),
  images: z.array(z.string()),
  category: z.number().min(0),
})

export default createProductSchema
