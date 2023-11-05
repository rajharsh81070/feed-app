import crypto from 'crypto'
import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from '@typegoose/typegoose'
import bcrypt from 'bcryptjs'

@index({ email: 1, userName: 1 }, { unique: true })
@pre<User>('save', async function (next) {
  this.id = this._id
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12)
  next()
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  name: string

  @prop()
  id: string

  @prop({ unique: true, required: true })
  email: string

  @prop({ unique: true, required: true })
  userName: string

  @prop({ required: true, select: false })
  password: string

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User)
export default userModel
