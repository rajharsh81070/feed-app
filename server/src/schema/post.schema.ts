import { values } from 'lodash'
import { type } from 'os'
import { object, string, TypeOf } from 'zod'

export const createPostSchema = object({
  body: object({
    content: string({
      required_error: 'Content is required',
    }),
  }),
})

const postParams = {
  params: object({
    postId: string(),
  }),
}

const userParams = {
  params: object({
    userId: string(),
  }),
}

export const getPostsByUserSchema = object({
  ...userParams,
})

export const getPostSchema = object({
  ...postParams,
})

export const updatePostSchema = object({
  ...postParams,
  body: object({
    reaction: string(),
  }),
})

export const deletePostSchema = object({
  ...postParams,
})

export type CreatePostInput = TypeOf<typeof createPostSchema>['body']
export type GetPostInput = TypeOf<typeof getPostSchema>['params']
export type UpdatePostInput = TypeOf<typeof updatePostSchema>
export type DeletePostInput = TypeOf<typeof deletePostSchema>['params']
export type GetPostsByUserInput = TypeOf<typeof getPostsByUserSchema>['params']
