import { AuthResponseSchemaType } from '../../../types/auth/authTypes.ts'

export type registerResponse = AuthResponseSchemaType & { token: string }
