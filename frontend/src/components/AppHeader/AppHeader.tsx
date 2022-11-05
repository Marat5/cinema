import { useState } from 'react';
import { ROUTES } from '../../utils/constants';
import './AppHeader.css';

export const AppHeader = () => {
  // Todo: use real is logged in state
  const [isLoggedIn] = useState(false);

  return (
    <div className="AppHeader">
      <a href="/"><h1 className="AppHeader__title">cinema</h1></a>
      {isLoggedIn
        ? <span className="AppHeader__username">username</span>
        : <a href={ROUTES.login} className="AppHeader__login">login</a>}
    </div>
  );
};
