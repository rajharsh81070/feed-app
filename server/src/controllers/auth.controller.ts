import { NextFunction, Request, Response } from 'express'
import { CreateUserInput, LoginUserInput } from '../schema/user.schema'
import { createUser, findUser, signToken } from '../services/user.service'
import AppError from '../utils/appError'

export const excludedFields = ['password']

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
    })

    await user.save()

    return res.status(201).json({
      status: 'success',
      message: 'An email with a verification code has been sent to your email',
    })
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email or Username already exist',
      })
    }
    next(err)
  }
}

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.emailOrUserName })

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401))
    }

    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signToken(user)

    // Send Access Token in Header
    res.set('Authorization', `Bearer ${access_token}`)

    // Send Access Token
    res.status(200).json({
      status: 'success',
      access_token,
    })
  } catch (err: any) {
    next(err)
  }
}

// Refresh tokens
const logout = (res: Response) => {
  res.set('Authorization', '')
}

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logout(res)
    res.status(200).json({ status: 'Logout Successfull' })
  } catch (err: any) {
    next(err)
  }
}
