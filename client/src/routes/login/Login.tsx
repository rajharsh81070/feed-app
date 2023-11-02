import React from 'react'
import { InputBox } from '../../components/input-box/InputBox'
import logo from '../../assets/icon/logo.svg'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global'
import { ToastType } from '../../components/toast/Toast'

const Login = () => {
  const dispatch = useDispatch()

  const [input, setInput] = React.useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  )

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const valideInput = () => {
    if (!input.email) {
      dispatch(
        setToast({
          message: 'Please enter your email',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    } else if (!validateEmail(input.email)) {
      dispatch(
        setToast({
          message: 'Please enter a valid email',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    if (!input.password) {
      dispatch(
        setToast({
          message: 'Please enter your password',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    return true
  }

  const handleLogin = () => {
    if (valideInput()) {
      console.log('Login')
    }
  }

  return (
    <div className="bg-[#131319] flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src={logo} alt="logo" />
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
                  value={input.email}
                  primaryLabel="Email or Username"
                  name="email"
                  placeholder="Enter your email or username"
                  type="email"
                  required={true}
                  onInputChange={handleInputChange}
                />
                <InputBox
                  id="password"
                  value={input.password}
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
      </div>
    </div>
  )
}

export default Login
