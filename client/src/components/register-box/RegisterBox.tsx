import React from 'react'
import { InputBox } from '../input-box/InputBox'
import { Link } from 'react-router-dom'
import Button from '../button/Button'

interface RegisterBoxProps {
  handleRegister: () => void
  isLoading: boolean
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  formData: {
    email: string
    userName: string
    password: string
  }
}

const RegisterBox = (props: RegisterBoxProps) => {
  const { handleRegister, handleInputChange, formData, isLoading } = props

  return (
    <div className="m-3 sm:flex-shrink-0 bg-[#27292D] border-2 rounded-lg border-solid border-[#969696] flex py-10 px-6 justify-center">
      <div className="flex flex-col gap-11">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-medium text-sm text-[#6B6C70] not-italic tracking-[0.42px]">
            SIGN UP
          </p>
          <p className="font-semibold text-lg text-[#FFF] not-italic tracking-[0.42px]">
            Create an account to continue
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-4">
            <InputBox
              id="email"
              value={formData.email}
              primaryLabel="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required={true}
              onInputChange={handleInputChange}
            />
            <InputBox
              id="userName"
              value={formData.userName}
              primaryLabel="Username"
              name="userName"
              placeholder="Choose a preferred username"
              type="text"
              required={true}
              onInputChange={handleInputChange}
            />
            <InputBox
              id="password"
              value={formData.password}
              primaryLabel="Password"
              name="password"
              placeholder="Choose a strong password"
              type="password"
              required={true}
              onInputChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3 items-start">
            <Button
              isLoading={isLoading}
              label="Continue"
              onClick={handleRegister}
            />
            <div className="flex">
              <p className="text-[#7F8084] text-sm font-medium">
                Already have an account?&nbsp;
              </p>
              <Link className="text-[#C5C7CA] text-sm font-medium" to="/login">
                Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterBox
