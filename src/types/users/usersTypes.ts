import { z } from 'zod'
import { singleUserResponseSchema, usersResponseSchema } from '../../utils/models/usersSchemas'

export type SingleUserResponseSchemaType = z.infer<typeof singleUserResponseSchema>
export type UsersResponseSchemaType = z.infer<typeof usersResponseSchema>
