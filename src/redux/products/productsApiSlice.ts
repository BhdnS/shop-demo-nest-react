import { apiSlice } from '../api/apiSlice.ts'
import {
  CreateProductSchemaType,
  ResponseAllProductSchemaType,
  ResponseProductSchemaType,
} from '../../types/products/products.ts'
import { TagTypes } from '../../utils/constants'
import { transformResponseValidate } from '../../utils/helpers'
import { responseAllProductSchema, responseProductSchema } from '../../utils/models/productsSchemas'

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<ResponseAllProductSchemaType, number>({
      query: (id) => ({
        url: `/products/find-all-by-category/${id}`,
      }),
      transformResponse: (response) => transformResponseValidate(response, responseAllProductSchema),
      providesTags: [TagTypes.Product],
    }),
    createProduct: builder.mutation<ResponseProductSchemaType, CreateProductSchemaType>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      transformResponse: (response) => transformResponseValidate(response, responseProductSchema),
      invalidatesTags: [TagTypes.Product],
    }),
    updateProductById: builder.mutation<ResponseProductSchemaType, ResponseProductSchemaType>({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response) => transformResponseValidate(response, responseProductSchema),
      invalidatesTags: [TagTypes.Product],
    }),
    deleteProductById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.Product],
    }),
  }),
})

export const {
  useCreateProductMutation,
  useGetProductsByCategoryQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} = productsApiSlice
