import { FormEvent, ReactNode } from 'react';
import './AuthCard.css';

type Props = {
  children: ReactNode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  title?: string
};

export function AuthCard({
  children, title, handleSubmit,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="AuthCard">
      {title && <h1 className="AuthCard__title">{title}</h1>}
      {children}
    </form>
  );
}
