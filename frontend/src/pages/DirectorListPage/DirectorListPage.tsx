import { useDirectors } from '../../api/queries/useDirectors';
import { CustomTable } from '../../components/CustomTable/CustomTable';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import { directorTableColumns } from './constants';

export const DirectorListPage = () => {
  const {
    data, isAllDataLoaded, loadMore, networkStatus
  } = useDirectors();

  return (
    <>
      <PageHeading title="Movie Directors" />

      <CustomTable
        columns={directorTableColumns}
        tableData={data?.directors}
        networkStatus={networkStatus}
        loadMore={loadMore}
        isAllDataLoaded={isAllDataLoaded}
      />
    </>
  );
};
