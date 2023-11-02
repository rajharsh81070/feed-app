import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './login/Login'
import NotFound from '../components/not-found/NotFound'
import Toast from '../components/toast/Toast'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
])

const App = () => {
  const { toast } = useSelector((state: RootState) => state.globalState)

  return (
    <>
      <RouterProvider router={router} />
      <Toast
        duration={toast.duration}
        message={toast.message}
        type={toast.type}
      />
    </>
  )
}

export default App
