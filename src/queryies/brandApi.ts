import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../types/types'

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getBrands: builder.query<string[],void>({
      query: () => `/brands`,
    }),
    getProduct: builder.query<IProduct,string>({
      query: (id) => `/products/${id}`,
    })
  }),
})

export const { useGetBrandsQuery,useGetProductQuery } = brandsApi