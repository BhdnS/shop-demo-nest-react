import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import { logOut, setToken } from '../auth/authSlice.ts'
import { TagTypesArray } from '../../utils/constants'
import { RootState } from '../store/store.ts'
import { AuthLinksEnum } from '../../types/enums/apiEnums'
import { EnvVariableEnum } from '../../types/enums'

const baseQuery = fetchBaseQuery({
  baseUrl: `${EnvVariableEnum.API}`,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth

    if (token) {
      headers.set('authorization', token)
    }
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    try {
      const refreshToken = await baseQuery(
        {
          url: AuthLinksEnum.REFRESH_TOKEN,
          method: 'POST',
          credentials: 'include',
        },
        api,
        extraOptions
      )

      if (refreshToken.error && (refreshToken.error.status === 499 || refreshToken.error.status === 498)) {
        api.dispatch(logOut())
        return result
      }

      if (refreshToken.meta) {
        const headers = refreshToken?.meta?.response?.headers

        if (!headers) {
          api.dispatch(logOut())
          return result
        }

        const token = headers?.get('authorization') as string
        if (token) {
          api.dispatch(setToken(token))
          return baseQuery(args, api, extraOptions)
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      api.dispatch(logOut())
      return result
    }
  }

  return result
}

export const apiSlice = createApi({
  tagTypes: TagTypesArray,
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
