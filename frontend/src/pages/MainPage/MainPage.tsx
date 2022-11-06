import { LimitedWidthContent } from '../../components/LimitedWidthContent/LimitedWidthContent';
import { MainPageCard } from '../../components/MainPageCard/MainPageCard';
import './MainPage.css';

export const MainPage = () => (
  <LimitedWidthContent className="MainPage">
    <h2 className="MainPage__title">
      <span>The complete database </span>
      <span>of movies watched and rated by</span>
      <span> Superuser </span>
      <span>throuout his life</span>
    </h2>

    <div className="MainPage__CardGroup">
      <MainPageCard />
      <MainPageCard />
    </div>
    <MainPageCard />

  </LimitedWidthContent>
);
