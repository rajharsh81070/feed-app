import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
