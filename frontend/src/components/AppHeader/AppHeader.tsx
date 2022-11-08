import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import './AppHeader.css';

export const AppHeader = () => {
  // Todo: use real is logged in state
  const [isLoggedIn] = useState(false);

  return (
    <div className="AppHeader">
      <Link to="/"><h1 className="AppHeader__title">cinema</h1></Link>
      {isLoggedIn
        ? <span className="AppHeader__username">username</span>
        : <Link to={ROUTES.login} className="AppHeader__login">login</Link>}
    </div>
  );
};
