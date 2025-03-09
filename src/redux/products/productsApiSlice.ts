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
      query: (category) => ({
        url: `/products/find-all-by-category`,
        params: { category },
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
        url: `/products`,
        method: 'PATCH',
        body,
        params: { id: body.id },
      }),
      transformResponse: (response) => transformResponseValidate(response, responseProductSchema),
      invalidatesTags: [TagTypes.Product],
    }),
    deleteProductById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products`,
        method: 'DELETE',
        params: { id },
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
