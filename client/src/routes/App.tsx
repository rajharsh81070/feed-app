import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './login/Login'
import NotFound from '../components/not-found/NotFound'
import Toast from '../components/toast/Toast'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Register from './register/Register'
import Feed from './feed/Feed'
import { ThemeProvider } from '@material-tailwind/react'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <Feed />,
    errorElement: <NotFound />,
  },
])

const App = () => {
  const { toast } = useSelector((state: RootState) => state.globalState)

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toast
        duration={toast.duration}
        message={toast.message}
        type={toast.type}
      />
    </ThemeProvider>
  )
}

export default App
