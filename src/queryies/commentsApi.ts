import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../types/types'

interface IComment {
  userName: string;
  message: string;
  productId: number;
  date: string;
  id?: number;
}


export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes:['comment'],
  endpoints: (builder) => ({
    getComments: builder.query<IComment[],number>({
      query: (id) => `/comments?productId=${id}`,
      providesTags:() => [{type:"comment",id:"LIST"}]
    }),
    addComments: builder.mutation<void,IComment>({
      query: (body) => ({
        url:'comments',
        method:"POST",
        body,
      }),
      invalidatesTags:[{type:"comment",id:"LIST"}]
    })
  }),
})

export const { useGetCommentsQuery ,useAddCommentsMutation } = commentsApi