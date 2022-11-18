import { createSearchParams } from 'react-router-dom';
import { useMainPageData } from '../../api/queries/useMainPageData';
import { MoviesSortOption } from '../../api/queries/useMovies';
import { LimitedWidthContent } from '../../components/LimitedWidthContent/LimitedWidthContent';
import { MainPageCard } from '../../components/MainPageCard/MainPageCard';
import { ROUTES } from '../Router/constants';
import './MainPage.css';

export const MainPage = () => {
  const { data, loading } = useMainPageData();

  return (
    <LimitedWidthContent className="MainPage">
      <h2 className="MainPage__title">
        <span>The complete database </span>
        <span>of movies watched and rated by </span>
        <span className="MainPage__title_accent">Superuser</span>
      </h2>

      <div className="MainPage__CardGroup">
        <MainPageCard
          title="Top rated movies"
          isLoading={loading}
          listItems={data?.topRatedMovies.movies || []}
          to={{
            pathname: ROUTES.movies,
            search: String(createSearchParams({ sort: MoviesSortOption.RATING }))
          }}
        />
        <MainPageCard
          title="Seen lately"
          isLoading={loading}
          listItems={data?.recentlyWatchedMovies.movies || []}
          to={{
            pathname: ROUTES.movies,
            search: String(createSearchParams({ sort: MoviesSortOption.SEEN_LATELY }))
          }}
        />
      </div>
      <MainPageCard
        title="Top rated directors"
        isLoading={loading}
        listItems={data?.directorsData.directors || []}
        to={ROUTES.directors}
      />
      <MainPageCard
        title="Add new movie"
        to={ROUTES.moviesRoutes.add}
      />
    </LimitedWidthContent>
  );
};
