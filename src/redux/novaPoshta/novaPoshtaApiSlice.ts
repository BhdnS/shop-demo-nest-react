import { apiSlice } from '../api/apiSlice.ts'
import { transformResponseValidate } from '../../utils/helpers'
import { novaPoshtaResponseSchema } from '../../utils/models/novaPoshtaSchemas'
import { NovaPoshtaBranchType } from '../../types/novaPoshta/novaPoshta.ts'

const novaPoshtaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranch: builder.query<NovaPoshtaBranchType, string>({
      query: (city) => ({
        url: `nova-poshta/${city}`,
      }),
      transformResponse: (response) => transformResponseValidate(response, novaPoshtaResponseSchema),
    }),
  }),
})

export const { useGetBranchQuery } = novaPoshtaApiSlice
