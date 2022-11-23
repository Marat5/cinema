import classNames from 'classnames';
import { ReactNode } from 'react';
import './ButtonSet.css';

type Props = {
  children: ReactNode
  isHorizontal?: true
};

export const ButtonSet = ({ children, isHorizontal }: Props) => (
  <div className={classNames('ButtonSet', isHorizontal && 'ButtonSet_horizontal')}>
    {children}
  </div>
);
