import { ReactNode } from 'react';
import classNames from 'classnames';
import './CustomTable.css';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { NetworkStatus } from '@apollo/client';
import { COLORS } from '../../utils/constants';
import { CustomButton } from '../CustomButton/CustomButton';

export type CustomTableColumn<TableDataType> = {
  title: string
  key: Extract<keyof TableDataType, string>
  isHiddenOnMobile?: true
};

export type CustomTableSortOption<SortOptionKey> = {
  title: string
  key: SortOptionKey
  isActive?: boolean
};

// We expect tableData object to contain id field and
// other fields should be valid react nodes that can be rendered
type FlatObjectWithRenderableValuesAndId = {
  [key: string]: ReactNode
  id: number
};

type Props<TableDataType, SortOptionKey> = {
  columns: CustomTableColumn<TableDataType>[]
  tableData?: TableDataType[]
  loadMore?: () => void
  isAllDataLoaded?: boolean
  networkStatus?: NetworkStatus
  sort?: SortOptionKey
  sortOptions?: CustomTableSortOption<SortOptionKey>[]
  setSort?: (sort: SortOptionKey) => void
};

export const CustomTable = <TableDataType extends FlatObjectWithRenderableValuesAndId,
SortOptionKey extends string>
  ({
    tableData, columns, sortOptions = [], networkStatus, loadMore, isAllDataLoaded, setSort, sort
  }
  : Props<TableDataType, SortOptionKey>) => {
  const navigate = useNavigate();
  const onRowClick = (id: number) => {
    navigate(`${id}`);
  };

  if (networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.setVariables) {
    return <PulseLoader className="CustomTable__TableSubstitute_centered" size={20} color={COLORS.secondaryColor} />;
  }

  if (!tableData || tableData.length === 0) {
    return <span className="CustomTable__TableSubstitute_centered">No data. Feel free to create some</span>;
  }

  return (
    <>
      {Boolean(sortOptions.length)
      && (
      <div className="SortingRow">
        <span>Sort By: </span>
        {sortOptions.map((sortOption) => (
          <button
            key={sortOption.key}
            type="button"
            onClick={() => setSort && setSort(sortOption.key)}
            className={classNames('SortingRow__option', sort === sortOption.key && 'SortingRow__option_active')}
          >
            {sortOption.title}
          </button>
        ))}
      </div>
      )}

      <table className="CustomTable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={classNames(column.isHiddenOnMobile && 'CustomTable__col_hide-mobile')}
              >
                {column.title}

              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr
              key={item.id}
              className="CustomTable__row_clickable"
              onClick={() => onRowClick(item.id)}
            >
              {columns.map((column, index) => (
                <td
                  key={column.key}
                  className={classNames(column.isHiddenOnMobile && 'CustomTable__col_hide-mobile')}
                >
                  {index === 0
                    ? (
                      // The link is here for accessibility
                      <Link onClick={(e) => e.stopPropagation()} to={`${item.id}`}>
                        {item[column.key]}
                      </Link>
                    )
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {!isAllDataLoaded
            && (
            <CustomButton
              text="load more"
              onClick={loadMore}
              className="CustomTable__LoadMore"
              showLoadIndicator={networkStatus === NetworkStatus.fetchMore}
            />
            )}
    </>
  );
};
