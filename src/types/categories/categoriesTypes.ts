import { z } from 'zod'
import { createCategorySchema, allCategorySchema, responseCategorySchema } from '../../utils/models/categoriesSchemas'

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>
export type AllCategorySchemaType = z.infer<typeof allCategorySchema>
export type ResponseCategorySchemaType = z.infer<typeof responseCategorySchema>
