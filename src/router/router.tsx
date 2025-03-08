import { createBrowserRouter } from 'react-router'
import { RoutesEnum } from '../types/enums'
import ErrorComponent from '../components/pagesComponents/ErrorComponent'
import LayoutAuth from '../components/Layouts/LayoutAuth'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomeComponents from '../components/pagesComponents/HomeComponents'
import RequireAuth from '../components/pagesComponents/RequireAuth'
import DashboardPage from '../pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: RoutesEnum.ROOT,
    element: <HomeComponents />,
    errorElement: <ErrorComponent />,
  },
  {
    element: <LayoutAuth />,
    children: [
      {
        path: RoutesEnum.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutesEnum.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        index: true,
        path: RoutesEnum.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
])

export default router
