import { FC, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { useViewer } from 'entities/viewer'

import { Paths } from './paths'

const RegisterPage = lazy(() => import('pages/register'))
const LoginPage = lazy(() => import('pages/login'))
const HomePage = lazy(() => import('pages/home'))
const TaskPage = lazy(() => import('pages/task'))

interface IRoute {
  path: Paths
  element: React.ReactElement
}

export const Routes: FC = () => {
  const { viewer } = useViewer()

  const publicRoutes: IRoute[] = [
    {
      path: Paths.LOGIN,
      element: !viewer?._id ? <LoginPage /> : <Navigate to={'/'} replace />,
    },
    {
      path: Paths.REGISTER,
      element: !viewer?._id ? <RegisterPage /> : <Navigate to={'/'} replace />,
    },
  ]
  const authRoutes: IRoute[] = [
    {
      path: Paths.HOME,
      element: viewer?._id ? <HomePage /> : <Navigate to={'/register'} replace />,
    },
    {
      path: Paths.TASK,
      element: viewer?._id ? <TaskPage /> : <Navigate to={'/register'} replace />,
    },
  ]

  const routes = useRoutes([...publicRoutes, ...authRoutes])
  return routes
}
