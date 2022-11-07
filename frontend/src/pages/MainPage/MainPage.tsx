import { LimitedWidthContent } from '../../components/LimitedWidthContent/LimitedWidthContent';
import { MainPageCard } from '../../components/MainPageCard/MainPageCard';
import './MainPage.css';

export const MainPage = () => (
  <LimitedWidthContent className="MainPage">
    <h2 className="MainPage__title">
      <span>The complete database </span>
      <span>of movies watched and rated by </span>
      <span className="MainPage__title_accent">Superuser</span>
    </h2>

    <div className="MainPage__CardGroup">
      <MainPageCard title="Seen lately" />
      <MainPageCard title="Top rated" />
    </div>
    <MainPageCard title="Top rated movie directors" />

  </LimitedWidthContent>
);
