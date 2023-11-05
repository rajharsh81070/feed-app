import express from 'express'
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
} from '../controllers/post.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  getPostsByUserSchema,
  updatePostSchema,
} from '../schema/post.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)
router.route('/create').post(validate(createPostSchema), createPostHandler)

router.route('').get(getPostsHandler)

router
  .route('/user/:userId')
  .get(validate(getPostsByUserSchema), getPostsHandler)

router
  .route('/:postId')
  .get(validate(getPostSchema), getPostHandler)
  .patch(validate(updatePostSchema), updatePostHandler)
  .delete(validate(deletePostSchema), deletePostHandler)

export default router
