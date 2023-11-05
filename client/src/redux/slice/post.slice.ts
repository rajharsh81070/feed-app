import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../../api/types'

interface IPostState {
  posts: IPost[]
}

const initialState: IPostState = {
  posts: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      return {
        ...state,
        posts: action.payload,
      }
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      }
    },
  },
})

export default postSlice.reducer

export const { setPosts, addPost, updatePost } = postSlice.actions
