import { ReactionsType } from '../constants'

export interface IUser {
  email: string
  userName: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface IPost {
  content: string
  isAnonymous?: boolean
  reaction?: ReactionsType
  user?: Partial<IUser>
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  access_token: string
  status: string
}
