import { Navigate, Outlet } from 'react-router-dom'
import LocalStorageUtil from 'src/utils/LocalStorageUtil';

const PublicRoutes = () => {
  const isAuth = LocalStorageUtil.getUser();

  return !isAuth ? <Outlet /> : <Navigate to='/home' />
}

export default PublicRoutes;