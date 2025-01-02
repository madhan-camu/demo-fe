import { useCallback, useEffect, useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import _ from "lodash";
import './Table.css';

export function Table({ tableTitle, tableColumns, tableData, totalDataCount, TableActions, getListAPI, getListAPILoading }) {

  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    setData(tableData ?? []);
  }, [tableData]);

  useEffect(() => {
    setPagination((pre) => ({ ...pre, total: totalDataCount }));
  }, [totalDataCount]);

  const columns = useMemo(() => [
    ...(tableColumns ?? [])
  ], []);

  const debouncedSearch = useCallback(
    _.debounce((value) => {
      getListAPI(value, (pagination.pageIndex * pagination.pageSize), pagination.pageSize);
    }, 300),
    [pagination.pageIndex, pagination.pageSize]
  );

  useEffect(() => {
    debouncedSearch(globalFilter);
  }, [globalFilter, debouncedSearch]);

  const table = useReactTable({
    columns, data,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(pagination.total / pagination.pageSize)
  });

  function handlePageSizeChange({ target: { value } }) {
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(value, 10),
      pageIndex: 0
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>{tableTitle}</h4>
        <div className="d-flex table-actions">
          <input className="w-auto" value={globalFilter} placeholder="Search..."
            onChange={({ target: { value } }) => setGlobalFilter(value?.trim())} />
          {TableActions}
        </div>
      </div>
      {getListAPILoading ? <span className="d-flex h-100 align-items-center justify-content-center">{tableTitle} Loading...</span> :
        <div className="table-container">
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} style={{ width: header.column.columnDef.width || 'auto' }}
                      className="table-header" onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder ? null : (
                        <>
                          {header.column.columnDef.header}
                          {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? 
                          <i className="bi bi-sort-up-alt" />: <i className="bi bi-sort-down-alt" />) : ''}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-data" title={cell.getValue(cell.column.id)}
                      style={{ width: cell.column.columnDef.width || 'auto' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      <div className="d-flex w-auto ml-auto pagination-controls">
        <div className="d-flex page-count-selector">
          <i className="bi bi-chevron-double-left" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}></i>
          <i className="bi bi-chevron-left" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}></i>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <i className="bi bi-chevron-right" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}></i>
          <i className="bi bi-chevron-double-right" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}></i>
        </div>
        <div className="d-flex page-size-selector">
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            value={pagination.pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Table;