import classNames from 'classnames';
import { ReactNode } from 'react';
import './LimitedWidthContent.css';

type Props = {
  children: ReactNode
  className: string
};
export const LimitedWidthContent = ({ children, className }: Props) => (
  <div className={classNames('LimitedWidthContent', className)}>
    {children}
  </div>
);
