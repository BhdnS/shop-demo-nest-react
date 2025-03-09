import { z } from 'zod'
import responseCategorySchema from './responseCategorySchema.ts'

const allCategorySchema = z.array(responseCategorySchema)

export default allCategorySchema
