import { FormEvent, ReactNode } from 'react';
import './AuthTemplate.css';

type Props = {
  children: ReactNode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  title?: string
};

export function AuthTemplate({
  children, title, handleSubmit,
}: Props) {
  return (
    <div className="AuthTemplate">
      <form onSubmit={handleSubmit} className="AuthTemplate__card">
        {title && <h1 className="AuthTemplate__title">{title}</h1>}
        {children}
      </form>
    </div>

  );
}
