// src/components/DishTable.js
import React from 'react'
import { useTable, useSortBy, useExpanded } from 'react-table'

const DishTable = ({ data, updatePrice }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Label',
        accessor: 'label',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell }) => (
          <input
            type="number"
            value={cell.value}
            onChange={(e) => updatePrice(cell.row.original.id, e.target.value)}
          />
        ),
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    [updatePrice],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded,
  )

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
                {row.isExpanded && row.subRows ? ( // Check if row is expanded and has subRows
                  <tr>
                    <td colSpan={columns.length}>
                      {row.subRows.map((subRow) => (
                        <div key={subRow.id}>{subRow.original.name}</div>
                      ))}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DishTable
