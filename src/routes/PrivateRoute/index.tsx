import { Navigate, Outlet } from 'react-router-dom'
import LocalStorageUtil from 'src/utils/LocalStorageUtil';

const PrivateRoutes = () => {
  const isAuth = LocalStorageUtil.getUser();

  return isAuth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes;