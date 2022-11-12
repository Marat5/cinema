import { ReactNode } from 'react';
import classNames from 'classnames';
import './CustomTable.css';
import { Link, useNavigate } from 'react-router-dom';

export type CustomTableColumn<TableDataType> = {
  title: string
  key: Extract<keyof TableDataType, string>
  isHiddenOnMobile?: true
};

export type CustomTableSortOption<TableDataType> = {
  title: string
  key: Extract<keyof TableDataType, string>
  isActive?: boolean
};

// We expect tableData object to contain id field and
// other fields should be valid react nodes that can be rendered
type FlatObjectWithRenderableValuesAndId = {
  [key: string]: ReactNode
  id: number
};

type Props<TableDataType> = {
  tableData: TableDataType[]
  columns: CustomTableColumn<TableDataType>[]
  sortOptions?: CustomTableSortOption<TableDataType>[]
};

export const CustomTable = <TableDataType extends FlatObjectWithRenderableValuesAndId>
  ({
    tableData, columns, sortOptions = []
  }
  : Props<TableDataType>) => {
  const navigate = useNavigate();
  const onRowClick = (id: number) => {
    navigate(`${id}`);
  };

  const setSorting = (sortByKey: string) => {
    // eslint-disable-next-line no-console
    console.log(sortByKey);
  // todo after connected to be
  };

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
            onClick={() => setSorting(sortOption.key)}
            className={classNames('SortingRow__option', sortOption.isActive && 'SortingRow__option_active')}
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
    </>
  );
};
