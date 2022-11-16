import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useCurrentUser } from '../../api/queries/useCurrentUser';
import { ROUTES } from '../../pages/Router/constants';
import { COLORS } from '../../utils/constants';
import './AppHeader.css';

// Avoid nesting ternary operators
const UsernameOrLoginLinkOrLoading = ({ isLoading, username }: {
  username?: string
  isLoading: boolean
}) => {
  if (isLoading) {
    return <PulseLoader size={10} color={COLORS.secondaryColor} />;
  }

  if (!username) {
    return <Link to={ROUTES.login} className="AppHeader__login">login</Link>;
  }

  return (
    <span className="AppHeader__username">
      {username}
    </span>
  );
};

export const AppHeader = () => {
  const { data, loading } = useCurrentUser();

  return (
    <div className="AppHeader">
      <Link to={ROUTES.main}><h1 className="AppHeader__title">cinema</h1></Link>

      <UsernameOrLoginLinkOrLoading username={data?.user.username} isLoading={loading} />
    </div>
  );
};
