import { MoviesSortOption, useMovies } from '../../api/queries/useMovies';
import { CustomTable } from '../../components/CustomTable/CustomTable';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import { useSearchParamSort } from '../../hooks/useSearchParamSort';
import { movieTableColumns, movieTableSortOptions } from './constants';

export const MovieListPage = () => {
  const [sort, setSort] = useSearchParamSort<MoviesSortOption>(MoviesSortOption.RATING);
  const {
    data, networkStatus, isAllDataLoaded, loadMore
  } = useMovies(sort);
  const title = sort === MoviesSortOption.RATING ? 'Top Rated Movies' : 'Lately Seen Movies';

  return (
    <>
      <PageHeading title={title} />

      <CustomTable
        columns={movieTableColumns}
        tableData={data?.movies}
        networkStatus={networkStatus}
        loadMore={loadMore}
        isAllDataLoaded={isAllDataLoaded}
        sortOptions={movieTableSortOptions}
        sort={sort}
        setSort={setSort}
      />
    </>
  );
};
