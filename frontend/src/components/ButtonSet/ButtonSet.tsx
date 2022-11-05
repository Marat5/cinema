import { ReactNode } from 'react';
import './ButtonSet.css';

type Props = {
  children: ReactNode
};

export const ButtonSet = ({ children }: Props) => (
  <div className="ButtonSet">
    {children}
  </div>
);
