import { CustomTableColumn } from '../../components/CustomTable/CustomTable';
import { Director } from '../../utils/types';

export const directorTableColumns: CustomTableColumn<Director>[] = [{
  title: 'Name',
  key: 'name'
}, {
  title: 'Movies watched',
  key: 'moviesWatched',
}, {
  title: 'Average Rating',
  key: 'averageRating'
}];
