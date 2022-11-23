import { Outlet } from 'react-router-dom';
import './CommonLayout.css';

export const CommonLayout = () => (
  <div className="CommonLayout">
    <Outlet />
  </div>
);
