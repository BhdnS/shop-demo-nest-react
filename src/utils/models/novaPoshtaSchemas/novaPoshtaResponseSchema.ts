import { z } from 'zod'

const novaPoshtaResponseSchema = z.object({
  Number: z.string(),
  Description: z.string(),
})

export default novaPoshtaResponseSchema
