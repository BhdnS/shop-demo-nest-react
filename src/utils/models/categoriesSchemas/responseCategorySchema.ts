import { z } from 'zod'

const responseCategorySchema = z.object({
  name: z.string().nonempty(),
  image: z.string().nonempty(),
  id: z.number(),
})

export default responseCategorySchema
