import { apiSlice } from '../api/apiSlice.ts'
import { transformResponseValidate } from '../../utils/helpers'
import { usersResponseSchema } from '../../utils/models/usersSchemas'
import singleUserResponseSchema from '../../utils/models/usersSchemas/singleUserResponseSchema.ts'
import { SingleUserResponseSchemaType } from '../../types/users/usersTypes.ts'
import { TagTypes } from '../../utils/constants'

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/user/all-users',
      }),
      transformResponse: (response) => transformResponseValidate(response, usersResponseSchema),
      providesTags: [TagTypes.User],
    }),
    editUser: builder.mutation<SingleUserResponseSchemaType, SingleUserResponseSchemaType>({
      query: (data) => ({
        url: '/user/update',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => transformResponseValidate(response, singleUserResponseSchema),
      invalidatesTags: [TagTypes.User],
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/user/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.User],
    }),
  }),
})

export const { useGetAllUsersQuery, useDeleteUserMutation, useEditUserMutation } = usersApiSlice
