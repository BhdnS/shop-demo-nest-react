import { z } from 'zod'
import {
  createProductSchema,
  responseProductSchema,
  responseAllProductSchema,
} from '../../utils/models/productsSchemas'

export type CreateProductSchemaType = z.infer<typeof createProductSchema>
export type ResponseProductSchemaType = z.infer<typeof responseProductSchema>
export type ResponseAllProductSchemaType = z.infer<typeof responseAllProductSchema>
