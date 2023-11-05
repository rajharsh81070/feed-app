import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import postModel, { Post } from '../models/post.model'
import { User } from '../models/user.model'
import { omit } from 'lodash'
import { commonKeysToExclude } from '../constants'

const parsePost = (post: Post | null) => {
  if (!post) return null

  const newPost = omit(post, commonKeysToExclude)
  return {
    ...newPost,
    user:
      typeof newPost?.user === 'object'
        ? {
            ...omit(newPost.user, [...commonKeysToExclude, 'password']),
            userName: newPost.isAnonymous
              ? 'Anonymous'
              : (newPost.user as User)['userName'],
            email: newPost.isAnonymous
              ? 'Anonymous'
              : (newPost.user as User)['email'],
          }
        : newPost.user,
  }
}

export const createPost = async ({
  input,
  user_id,
}: {
  input: Partial<Post>
  user_id: string
}) => {
  return postModel.create({ ...input, user: user_id })
}

export const findPostById = async (id: string) => {
  return parsePost(
    await postModel
      .findById(id)
      .populate('user')
      .lean()
      .exec()
      .then((post) => JSON.parse(JSON.stringify(post)))
  )
}

export const findAllPosts = async (isAnonymous: boolean) => {
  const posts = (
    await postModel.find({ isAnonymous }).populate('user').lean().exec()
  ).map((post) => JSON.parse(JSON.stringify(post)))

  return posts.map(parsePost)
}

export const findAllPostsByUser = async (user_id: string) => {
  const posts = (
    await postModel
      .find({
        user: user_id,
      })
      .populate('user')
      .lean()
      .exec()
  ).map((post) => JSON.parse(JSON.stringify(post)))

  return posts.map(parsePost)
}

export const findPost = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOne(query, {}, options).lean()
}

export const findAndUpdatePost = async (
  query: FilterQuery<Post>,
  update: UpdateQuery<Post>,
  options: QueryOptions
) => {
  return parsePost(
    await postModel
      .findOneAndUpdate(query, update, options)
      .populate('user')
      .lean()
      .then((post) => JSON.parse(JSON.stringify(post)))
  )
}

export const findOneAndDelete = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOneAndDelete(query, options).lean().exec()
}
