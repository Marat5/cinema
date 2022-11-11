import { CustomTableColumn, CustomTableSortOption } from '../../components/CustomTable/CustomTable';
import { Movie } from '../../utils/types';

export const movieTableColumns: CustomTableColumn<Movie>[] = [{
  key: 'title',
  title: 'Title',
}, {
  key: 'director_name',
  title: 'Director'
}, {
  key: 'rating',
  title: 'Rating'
}, {
  // todo
  key: 'year',
  title: 'IMDB Rating',
  isHiddenOnMobile: true
}, {
  // todo
  key: 'id',
  title: 'When watched',
  isHiddenOnMobile: true
}];

export const movieTableSortOptions: CustomTableSortOption<Movie>[] = [{
  key: 'rating',
  title: 'Rating',
  isActive: true
}, {
  // todo
  key: 'id',
  title: 'Seen Lately'
}];
