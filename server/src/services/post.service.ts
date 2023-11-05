import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import postModel, { Post } from '../models/post.model'
import { User } from '../models/user.model'

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
  return postModel.findById(id).lean()
}

export const findAllPosts = async (isAnonymous?: boolean) => {
  if (isAnonymous !== undefined) {
    return postModel.find({ isAnonymous }).populate('user')
  }
  return (await postModel.find().populate('user')).map(parsePost)
}

export const findAllPostsByUser = async (user: Partial<User>) => {
  return await postModel
    .find({
      user,
    })
    .populate('user')
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
  return await postModel.findOneAndUpdate(query, update, options).lean()
}

export const findOneAndDelete = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOneAndDelete(query, options)
}

const parsePost = (post: Post) => ({
  ...post,
  user: {
    ...post.user,
    userName: post.isAnonymous ? 'Anonymous' : (post.user as User)['userName'],
    email: post.isAnonymous ? 'Anonymous' : (post.user as User)['email'],
  },
})
