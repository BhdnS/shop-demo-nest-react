import { User } from '@prisma/client'

export interface IJwtPayload {
  user: User
  iat: number
  exp: number
}
