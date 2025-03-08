import { z } from 'zod'
import { RoleEnum } from '../../../types/enums'

const Role = z.enum([RoleEnum.ADMIN, RoleEnum.USER])

const authResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  role: Role,
})

export default authResponseSchema
