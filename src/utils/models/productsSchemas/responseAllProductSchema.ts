import { z } from 'zod'
import responseProductSchema from './responseProductSchema.ts'

const responseAllProductSchema = z.array(z.object(responseProductSchema))

export default responseAllProductSchema
