import { CustomTable } from '../../components/CustomTable/CustomTable';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import { MOVIES } from '../../utils/constants';
import { movieTableColumns, movieTableSortOptions } from './constants';

export const MovieListPage = () => (
  <>
    <PageHeading title="Top Rated Movies" />

    <CustomTable
      tableData={MOVIES}
      columns={movieTableColumns}
      sortOptions={movieTableSortOptions}
    />
  </>
);
