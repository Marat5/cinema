import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../api/queries/useCurrentUser';
import { ROUTES } from '../../pages/Router/constants';

export const PrivateRoute = () => {
  const { isLoggedIn } = useCurrentUser();

  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.main} />;
};
