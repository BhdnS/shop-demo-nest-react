import { apiSlice } from '../api/apiSlice.ts'

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
      }),
    }),
  }),
})

export const { useGetAllUsersQuery } = usersApiSlice
