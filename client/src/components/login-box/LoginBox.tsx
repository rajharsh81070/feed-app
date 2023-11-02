import React from 'react'
import { InputBox } from '../input-box/InputBox'
import { Link } from 'react-router-dom'
import Button from '../button/Button'

interface LoginBoxProps {
  handleLogin: () => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  formData: {
    email: string
    password: string
  }
}

const LoginBox = (props: LoginBoxProps) => {
  const { handleLogin, handleInputChange, formData } = props

  return (
    <div className="m-3 sm:flex-shrink-0 bg-[#27292D] border-2 rounded-lg border-solid border-[#969696] flex py-10 px-6 justify-center">
      <div className="flex flex-col gap-11">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-medium text-sm text-[#6B6C70] not-italic tracking-[0.42px]">
            WELCOME BACK
          </p>
          <p className="font-semibold text-lg text-[#FFF] not-italic tracking-[0.42px]">
            Log into your account
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-4">
            <InputBox
              id="email"
              value={formData.email}
              primaryLabel="Email or Username"
              name="email"
              placeholder="Enter your email or username"
              type="email"
              required={true}
              onInputChange={handleInputChange}
            />
            <InputBox
              id="password"
              value={formData.password}
              primaryLabel="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              secondaryLabel="Forgot Password?"
              onSecondaryLabelClick={() => console.log('Forgot Password')}
              required={true}
              onInputChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3 items-start">
            <Button label="Login Now" onClick={handleLogin} />
            <div className="flex">
              <p className="text-[#7F8084] text-sm font-medium">
                Not registered yet?&nbsp;
              </p>
              <Link
                className="text-[#C5C7CA] text-sm font-medium"
                to="/register"
              >
                Register →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginBox
