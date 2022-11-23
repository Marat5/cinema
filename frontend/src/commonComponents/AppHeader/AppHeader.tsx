import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useCurrentUser } from '../../api/queries/useCurrentUser';
import { useLogout } from '../../hooks/useLogout';
import { ROUTES } from '../../pages/Router/constants';
import { COLORS } from '../../utils/constants';
import './AppHeader.css';

// Extra component to avoid nesting ternary operators
const UsernameOrLoginLinkOrLoading = ({ isLoading, username, logout }: {
  username?: string
  isLoading: boolean
  logout: () => void
}) => {
  if (isLoading) {
    return <PulseLoader size={10} color={COLORS.secondaryColor} />;
  }

  return username ? (
    <div className="AppHeader__loggedIn">
      <span className="AppHeader__username">
        {username}
      </span>
      <button type="button" className="AppHeader__authAction" onClick={logout}>logout</button>
    </div>

  ) : <Link to={ROUTES.login} className="AppHeader__authAction">login</Link>;
};

export const AppHeader = () => {
  const {
    data, loading, refetch: refetchCurrentUser
  } = useCurrentUser();
  const logout = useLogout(refetchCurrentUser);

  return (
    <div className="AppHeader">
      <Link to={ROUTES.main}><h1 className="AppHeader__title">cinema</h1></Link>

      <UsernameOrLoginLinkOrLoading
        username={data?.user?.username}
        isLoading={loading}
        logout={logout}
      />
    </div>
  );
};
