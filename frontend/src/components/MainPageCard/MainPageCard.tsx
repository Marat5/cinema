import { Link } from 'react-router-dom';
import './MainPageCard.css';

type Props = {
  title: string
  listItems?: string[]
  to: string
};

export const MainPageCard = ({ title, listItems, to }: Props) => (
  <Link to={to} className="MainPageCard">
    <h1 className="MainPageCard__title">{title}</h1>

    {listItems
        && (
        <ol className="MainPageCard__list">
          {listItems.map((itemText) => <li key={itemText}>{itemText}</li>)}
        </ol>
        )}
  </Link>
);
