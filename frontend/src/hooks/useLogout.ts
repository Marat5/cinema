import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../pages/Router/constants';
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constants';

// useLogout accepts refetchCurrentUser because there's a bug in ApolloClient:
// Loading state on refetch is not shared between components that use the same query,
// So we pass it as a prop from a single useQuery hook
export const useLogout = (refetchCurrentUser: () => void) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    refetchCurrentUser();
    navigate(ROUTES.login);
  };

  return logout;
};
