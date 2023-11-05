import { createApi } from '@reduxjs/toolkit/query/react'
import { GenericResponse, IPost } from './types'
import customFetchBase from './customFetch'
import { addPost, setPosts, updatePost } from '../redux/slice/post.slice'
import { getLocalStorageItem } from '../utils/localStorage'
import { AccessToken } from '../constants'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBase,
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    createPost: builder.mutation<
      IPost,
      {
        content: string
        isAnonymous?: boolean
      }
    >({
      query(post) {
        return {
          url: '/posts/create',
          method: 'POST',
          credentials: 'include',
          body: post,
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (result: { data: { post: IPost } }) =>
        result.data.post,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(addPost(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updatePost: builder.mutation<
      IPost,
      {
        id: string
        post: {
          reaction: string
        }
      }
    >({
      query({ id, post }) {
        return {
          url: `/posts/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: post,
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: 'Posts', id },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (result: { data: { post: IPost } }) =>
        result.data.post,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(updatePost(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    getPost: builder.query<IPost, string>({
      query(id: string) {
        return {
          url: `/posts/${id}`,
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
      transformResponse: (result: { data: { post: IPost } }) =>
        result.data.post,
    }),
    getAllPosts: builder.query<IPost[], string>({
      query(postType: string) {
        return {
          url: `/posts?postType=${postType}`,
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Posts' as const,
                id,
              })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (result: { data: { posts: IPost[] } }) =>
        result.data.posts,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setPosts(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deletePost: builder.mutation<GenericResponse, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostByUser: builder.query<IPost[], string>({
      query(userId: string) {
        return {
          url: `/posts/user/${userId}`,
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Posts' as const,
                id,
              })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
      transformResponse: (result: { data: { posts: IPost[] } }) =>
        result.data.posts,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setPosts(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useGetPostQuery,
  useGetPostByUserQuery,
  useLazyGetPostByUserQuery,
  useLazyGetAllPostsQuery,
} = postApi
