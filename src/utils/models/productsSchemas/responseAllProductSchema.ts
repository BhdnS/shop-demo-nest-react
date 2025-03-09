import { z } from 'zod'
import responseProductSchema from './responseProductSchema.ts'

const responseAllProductSchema = z.array(responseProductSchema)

export default responseAllProductSchema
