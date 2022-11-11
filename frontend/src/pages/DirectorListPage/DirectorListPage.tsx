import { CustomTable } from '../../components/CustomTable/CustomTable';
import { PageHeading } from '../../components/PageHeading/PageHeading';
import { DIRECTORS } from '../../utils/constants';
import { directorTableColumns } from './constants';

export const DirectorListPage = () => (
  <>
    <PageHeading title="Movie Directors" />

    <CustomTable
      tableData={DIRECTORS}
      columns={directorTableColumns}
    />
  </>
);
