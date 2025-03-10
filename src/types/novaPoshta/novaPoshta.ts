import { z } from 'zod'
import { novaPoshtaResponseSchema } from '../../utils/models/novaPoshtaSchemas'

export type NovaPoshtaBranchType = z.infer<typeof novaPoshtaResponseSchema>
