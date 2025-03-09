import { z } from 'zod'

const productFormValidation = z.object({
  title: z.string().min(3),
  price: z.number().min(1),
  description: z.string().min(3),
  images: z.array(z.string()),
  category: z.number(),
})

export default productFormValidation
