import { z } from 'zod'
import {
  createProductSchema,
  responseProductSchema,
  responseAllProductSchema,
  productFormValidation,
} from '../../utils/models/productsSchemas'

export type CreateProductSchemaType = z.infer<typeof createProductSchema>
export type ResponseProductSchemaType = z.infer<typeof responseProductSchema>
export type ResponseAllProductSchemaType = z.infer<typeof responseAllProductSchema>
export type ProductFormValidationType = z.infer<typeof productFormValidation>
