import { useAppSelector } from '../../../hooks'
import { Navigate, Outlet, useLocation } from 'react-router'
import { RoutesEnum } from '../../../types/enums'

const RequireAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate to={RoutesEnum.LOGIN} state={{ from: location }} replace />
}

export default RequireAuth
