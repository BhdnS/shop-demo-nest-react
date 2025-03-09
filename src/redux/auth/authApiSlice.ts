import { apiSlice } from '../api/apiSlice.ts'
import { TagTypes, TagTypesArray } from '../../utils/constants'
import { LoginValidationSchemaType, RegisterValidationSchemaType } from '../../types/auth/authTypes.ts'
import { transformResponseValidate } from '../../utils/helpers'
import { registerResponse } from '../../utils/models/authSchemas/authApiSlice.ts'
import { authResponseSchema } from '../../utils/models/authSchemas'
import { AuthLinksEnum } from '../../types/enums/apiEnums'

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<registerResponse, LoginValidationSchemaType>({
      query: (credential) => ({
        url: AuthLinksEnum.LOGIN,
        method: 'POST',
        body: credential,
        credentials: 'include',
      }),
      transformResponse: (response, meta) => {
        const headers = meta?.response?.headers

        if (headers) {
          const token = headers.get('authorization') as string

          if (token) {
            const data = transformResponseValidate(response, authResponseSchema)

            return { ...data, token }
          }
        }

        throw new Error('Something went wrong')
      },
    }),
    register: builder.mutation<registerResponse, RegisterValidationSchemaType>({
      query: (credential) => ({
        url: AuthLinksEnum.REGISTER,
        method: 'POST',
        body: credential,
        credentials: 'include',
      }),
      transformResponse: (response, meta) => {
        const headers = meta?.response?.headers

        if (headers) {
          const token = headers.get('authorization') as string

          if (token) {
            const data = transformResponseValidate(response, authResponseSchema)

            return { ...data, token }
          }
        }

        throw new Error('Something went wrong')
      },
      invalidatesTags: [TagTypes.Auth],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: AuthLinksEnum.LOGOUT,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: TagTypesArray,
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice
