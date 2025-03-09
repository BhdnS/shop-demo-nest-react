import { z } from 'zod'
import singleUserResponseSchema from './singleUserResponseSchema.ts'

const usersResponseSchema = z.array(singleUserResponseSchema)

export default usersResponseSchema
