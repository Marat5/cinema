import { Link, To } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { MainPageDirector, MainPageMovie } from '../../api/queries/useMainPageData';
import { COLORS, MAIN_PAGE_CARD_ITEMS_COUNT } from '../../utils/constants';
import './MainPageCard.css';

type Props<ListItem> = {
  title: string
  listItems?: ListItem[]
  isLoading?: boolean
  to: To
};

type MainPageCardEntity = Partial<MainPageDirector & MainPageMovie>;

export const MainPageCard = <ListItem extends MainPageCardEntity>({
  title, listItems, to, isLoading
}: Props<ListItem>) => (
  <Link to={to} className="MainPageCard">
    <h1 className="MainPageCard__title">{title}</h1>

    {listItems
    && (isLoading ? (
      <ol className="MainPageCard__list">
        {Array.from(Array(MAIN_PAGE_CARD_ITEMS_COUNT).keys()).map((i) => (
          <PulseLoader key={i} size={10} color={COLORS.secondaryColor} />
        ))}
      </ol>
    ) : (
      <ol className="MainPageCard__list">
        {listItems.slice(0, MAIN_PAGE_CARD_ITEMS_COUNT).map((item) => (
          <li key={item.name || item.title}>
            {item.name || item.title}
          </li>
        ))}
      </ol>
    ))}
  </Link>
  );
