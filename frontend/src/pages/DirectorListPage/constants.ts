import { CustomTableColumn } from '../../components/CustomTable/CustomTable';
import { Director } from '../../utils/types';

export const directorTableColumns: CustomTableColumn<Director>[] = [{
  title: 'Name',
  key: 'name'
}, {
  title: 'Movies watched',
  key: 'movies_watched',
}, {
  title: 'Average Rating',
  key: 'average_rating'
}];
