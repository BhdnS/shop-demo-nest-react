import { apiSlice } from '../api/apiSlice.ts'
import { TagTypes } from '../../utils/constants'
import {
  AllCategorySchemaType,
  CreateCategorySchemaType,
  ResponseCategorySchemaType,
} from '../../types/categories/categoriesTypes.ts'
import { transformResponseValidate } from '../../utils/helpers'
import { allCategorySchema, responseCategorySchema } from '../../utils/models/categoriesSchemas'

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<AllCategorySchemaType, void>({
      query: () => '/categories',
      transformResponse: (response) => transformResponseValidate(response, allCategorySchema),
      providesTags: [TagTypes.Category],
    }),
    createCategory: builder.mutation<ResponseCategorySchemaType, CreateCategorySchemaType>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => transformResponseValidate(response, responseCategorySchema),
      invalidatesTags: [TagTypes.Category],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.Category],
    }),
  }),
})

export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = categoriesApiSlice
