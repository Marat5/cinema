import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import './MainPageCard.css';

type Props = {
  title: string
  listItems: string[]
};

export const MainPageCard = ({ title, listItems }: Props) => (
  <Link to={ROUTES.movies} className="MainPageCard">
    <h1 className="MainPageCard__title">{title}</h1>
    <ol className="MainPageCard__list">
      {listItems.map((itemText) => <li key={itemText}>{itemText}</li>)}
    </ol>
  </Link>
);
