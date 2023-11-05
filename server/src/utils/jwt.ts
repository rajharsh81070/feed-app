import jwt, { SignOptions } from 'jsonwebtoken'

export const signJwt = (
  payload: Object,
  key: 'ACCESS_TOKEN_PRIVATE_KEY' | 'ACCESS_TOKEN_PUBLIC_KEY',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(
    process.env[`${key}`] || '',
    'base64'
  ).toString('ascii')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export const verifyJwt = <T>(
  token: string,
  key: 'ACCESS_TOKEN_PRIVATE_KEY' | 'ACCESS_TOKEN_PUBLIC_KEY'
): T | null => {
  try {
    const publicKey = Buffer.from(
      process.env[`${key}`] || '',
      'base64'
    ).toString('ascii')
    const decoded = jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        return null
      }
      return decoded
    })

    return decoded as T
  } catch (error) {
    return null
  }
}
