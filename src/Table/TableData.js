import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
const TableData = ({ columns, data }) => {
  const props = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = props;

  React.useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
  }, [globalFilter]);

  return (
    <>
      <div className="">
        <section>
          <input
            type="text"
            className="px-3 py-2 rounded-lg text-sm w-64 bg-gray-100 mb-3 outline-none"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </section>
        <section>
          <table className=" " {...getTableProps()}>
            <thead className="rounded-lg  ">
              {headerGroups.map((headerGroup) => (
                <tr
                  className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-gray-200"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      className="py-3 px-6 text-left "
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                      {/* Render the columns filter UI */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="text-gray-600 text-sm font-light   "
              {...getTableBodyProps()}
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    className={`border-b border-gray-200 bg-gray-50 hover:bg-gray-100  `}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="py-3 px-6 text-left border-r border-gray-200 "
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <br />
          <div>
            Showing the first {pageSize} results of {rows.length} rows
          </div>
          <div>
            <pre>
              <code>{JSON.stringify(state.filters, null, 2)}</code>
            </pre>
          </div>
        </section>
      </div>
    </>
  );
};

export default TableData;
