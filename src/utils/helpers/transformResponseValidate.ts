import { ZodSchema } from 'zod'

type TransformResponseValidateType = <T>(response: unknown, schema: ZodSchema<T>) => T

const transformResponseValidate: TransformResponseValidateType = (response, schema) => {
  const validationResult = schema.safeParse(response)
  if (!validationResult.success) {
    throw new Error('Failed to parse response')
  }
  return validationResult.data
}

export default transformResponseValidate
