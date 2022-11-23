import { MoviesSortOption } from '../../api/queries/useMovies';
import { CustomTableColumn, CustomTableSortOption } from '../../commonComponents/CustomTable/CustomTable';
import { Movie } from '../../utils/types';

export const movieTableColumns: CustomTableColumn<Movie>[] = [{
  key: 'title',
  title: 'Title',
}, {
  key: 'directorName',
  title: 'Director'
}, {
  key: 'year',
  title: 'Year',
  isHiddenOnMobile: true
}, {
  key: 'rating',
  title: 'Rating'
}];

export const movieTableSortOptions: CustomTableSortOption<MoviesSortOption>[] = [{
  key: MoviesSortOption.RATING,
  title: 'Rating',
  isActive: true
}, {
  key: MoviesSortOption.SEEN_LATELY,
  title: 'Seen Lately'
}];
