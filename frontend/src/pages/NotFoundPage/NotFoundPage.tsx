import { Link } from 'react-router-dom';
import { FullPageMessage } from '../../commonComponents/FullPageMessage/FullPageMessage';
import { ROUTES } from '../Router/constants';

export const NotFoundPage = () => (
  <FullPageMessage
    title="404 Page Not Found"
    renderSubtitle={(highlightedTextCN) => (
      <h2>
        You can go to
        {' '}
        <Link className={highlightedTextCN} to={ROUTES.main}>Main Page</Link>
        {' '}
        and continue using the app
      </h2>
    )}
  />
);
