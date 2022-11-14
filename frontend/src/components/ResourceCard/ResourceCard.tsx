import './ResourceCard.css';

type Props = {
  title: string
  children: JSX.Element
};

export const ResourceCard = ({ title, children }: Props) => (
  <div className="ResourceCard">
    <h1 className="ResourceCard__title">{title}</h1>

    {children}
  </div>
);
