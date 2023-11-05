import { NextFunction, Request, Response } from 'express'
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  GetPostsByUserInput,
  UpdatePostInput,
} from '../schema/post.schema'
import {
  createPost,
  findAllPosts,
  findAllPostsByUser,
  findAndUpdatePost,
  findOneAndDelete,
  findPostById,
} from '../services/post.service'
import { findUserById } from '../services/user.service'
import AppError from '../utils/appError'
import { PostType } from '../constants'

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user._id

    const post = await createPost({ input: req.body, user_id })

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Post with that title already exist',
      })
    }
    next(err)
  }
}

export const getPostHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await findPostById(req.params.postId)

    if (!post) {
      return next(new AppError('Post with that ID not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getPostsByUserHandler = async (
  req: Request<GetPostsByUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.params.userId)

    if (!user) {
      return next(new AppError('User with that ID not found', 404))
    }

    const posts = await findAllPostsByUser(user)

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postType } = req.query
    const showAllPost = postType === PostType.All
    const showNonAnonymousPost = postType === PostType.NonAnoymous
    const posts = showAllPost
      ? await findAllPosts()
      : showNonAnonymousPost
      ? await findAllPosts(false)
      : await findAllPosts(true)

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const updatePostHandler = async (
  req: Request<UpdatePostInput['params'], {}, UpdatePostInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedPost = await findAndUpdatePost(
      { _id: req.params.postId },
      req.body,
      {}
    )

    if (!updatedPost) {
      return next(new AppError('Post with that ID not found', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPost,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const deletePostHandler = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await findOneAndDelete({ _id: req.params.postId })

    if (!post) {
      return next(new AppError('Post with that ID not found', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (err: any) {
    next(err)
  }
}
