import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose'
import { User } from './user.model'

@pre<Post>('save', async function (next) {
  this.id = this._id
  next()
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Post {
  @prop()
  id: string

  @prop({ required: true })
  content: string

  @prop({ default: false })
  isAnonymous: boolean

  @prop()
  reaction: string

  @prop({ required: true, ref: () => User })
  user: Ref<User>
}

const postModel = getModelForClass(Post)
export default postModel
