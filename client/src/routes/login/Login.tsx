import React from 'react'
import logo from '../../assets/icon/logo.svg'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global'
import { ToastType } from '../../components/toast/Toast'
import LoginBox from '../../components/login-box/LoginBox'

const Login = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = React.useState<{
    emailOrUsername: string
    password: string
  }>({
    emailOrUsername: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const valideLoginInput = () => {
    if (!formData.emailOrUsername) {
      dispatch(
        setToast({
          message: 'Please enter your Email or Username',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    if (!formData.password) {
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
    if (valideLoginInput()) {
      console.log('Login')
    }
  }

  return (
    <div className="bg-[#131319] flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src={logo} alt="logo" />
        <LoginBox
          handleLogin={handleLogin}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default Login
