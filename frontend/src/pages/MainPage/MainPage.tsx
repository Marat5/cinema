import { LimitedWidthContent } from '../../components/LimitedWidthContent/LimitedWidthContent';
import { MainPageCard } from '../../components/MainPageCard/MainPageCard';
import { MOVIES } from '../../utils/constants';
import { ROUTES } from '../Router/constants';
import './MainPage.css';

export const MainPage = () => (
  <LimitedWidthContent className="MainPage">
    <h2 className="MainPage__title">
      <span>The complete database </span>
      <span>of movies watched and rated by </span>
      <span className="MainPage__title_accent">Superuser</span>
    </h2>

    <div className="MainPage__CardGroup">
      <MainPageCard title="Seen lately" listItems={MOVIES.map((m) => m.title)} to={ROUTES.movies} />
      <MainPageCard title="Top rated movies" listItems={MOVIES.map((m) => m.title)} to={ROUTES.movies} />
    </div>
    <MainPageCard title="Top rated directors" listItems={MOVIES.map((m) => m.title)} to={ROUTES.directors} />
    <MainPageCard title="Add new movie" to={ROUTES.moviesRoutes.add} />
  </LimitedWidthContent>
);
