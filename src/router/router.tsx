import { createBrowserRouter } from 'react-router'
import { RoutesEnum } from '../types/enums'
import ErrorComponent from '../components/pagesComponents/ErrorComponent'
import LayoutAuth from '../components/Layouts/LayoutAuth'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomeComponents from '../components/pagesComponents/HomeComponents'
import RequireAuth from '../components/pagesComponents/RequireAuth'
import DashboardPage from '../pages/DashboardPage'
import Layout from '../components/Layouts/Layout/Layout.tsx'
import UsersPage from '../pages/UsersPage/UsersPage.tsx'
import OrdersPage from '../pages/OrdersPage'
import ProductsPage from '../pages/ProductsPage'
import CategoriesPage from '../pages/CategoriesPage'

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
        element: <Layout />,
        children: [
          {
            index: true,
            path: RoutesEnum.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: RoutesEnum.USERS,
            element: <UsersPage />,
          },
          {
            path: RoutesEnum.ORDERS,
            element: <OrdersPage />,
          },
          {
            path: RoutesEnum.CATEGORIES,
            element: <CategoriesPage />,
          },
          {
            path: RoutesEnum.PRODUCTS,
            element: <ProductsPage />,
          },
        ],
      },
    ],
  },
])

export default router
