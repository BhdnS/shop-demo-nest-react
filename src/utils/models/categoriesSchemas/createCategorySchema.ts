import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().nonempty(),
  image: z.string().nonempty(),
})

export default createCategorySchema
