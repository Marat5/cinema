import { ReactNode } from 'react';
import './ButtonSet.css';

type Props = {
  children: ReactNode
};

export function ButtonSet({ children }: Props) {
  return (
    <div className="ButtonSet">
      {children}
    </div>
  );
}
