import React from 'react'
import logo from '../../assets/icon/logo.svg'
import { useDispatch } from 'react-redux'
import { setToast } from '../../redux/slice/global'
import { ToastType } from '../../components/toast/Toast'
import RegisterBox from '../../components/register-box/RegisterBox'

const Register = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = React.useState<{
    email: string
    userName: string
    password: string
  }>({
    email: '',
    userName: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value.trim() }))
  }

  const valideRegisterInput = () => {
    if (!formData.email) {
      dispatch(
        setToast({
          message: 'Please enter your email',
          type: ToastType.Failure,
          duration: 3000,
        })
      )
      return false
    }
    if (!formData.userName) {
      dispatch(
        setToast({
          message: 'Please enter your user name',
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

  const handleRegister = () => {
    if (valideRegisterInput()) {
      console.log('Register')
    }
  }

  return (
    <div className="bg-[#131319] flex justify-center flex-col items-center min-h-screen w-full h-full">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src={logo} alt="logo" />
        <RegisterBox
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default Register
