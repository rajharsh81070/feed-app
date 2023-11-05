import { createApi } from '@reduxjs/toolkit/query/react'
import { setUser } from '../redux/slice/user.slice'
import { IUser } from './types'
import customFetchBase from './customFetch'
import { AccessToken } from '../constants'
import { getLocalStorageItem } from '../utils/localStorage'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: 'users/me',
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: getLocalStorageItem(AccessToken),
          },
        }
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useGetMeQuery, useLazyGetMeQuery } = userApi
