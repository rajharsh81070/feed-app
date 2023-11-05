import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { logout } from '../redux/slice/user.slice'

const baseUrl = `http://localhost:2000/api/`

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if ((result.error?.data as any)?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        api.dispatch(logout())
        window.location.href = '/login'
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export default customFetchBase
