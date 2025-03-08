import { z } from 'zod'
import { registerValidationSchema, authResponseSchema, loginValidationSchema } from '../../utils/models/authSchemas'

export type RegisterValidationSchemaType = z.infer<typeof registerValidationSchema>
export type AuthResponseSchemaType = z.infer<typeof authResponseSchema>
export type LoginValidationSchemaType = z.infer<typeof loginValidationSchema>
