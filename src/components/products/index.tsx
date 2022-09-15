import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useSortBy, useTable } from "react-table";
import GlobalFilter from "../globalFilter";

const Table = styled.table`
  ${tw`
  table-fixed
    text-base
text-gray-900
 `}
`;

const TableHead = styled.thead`
  ${tw`
   p-2
`}
`;

const TableRow = styled.tr`
  ${tw`
 border
    border-green-500
`}
`;

const TableHeader = styled.th`
  ${tw`
     border
    border-green-500
    p-2`}
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  ${tw`
    border
    border-green-500
    p-5
   `}
`;

const Button = styled.button`
  ${tw`
    pl-4
    pr-4
    pt-4
    pb-2
    text-black
    rounded-md
    bg-green-300
    hover:bg-green-200
    transition-colors
    `}
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    setProducts(data);
  };

  //   Table functions for operation
  const isEven = (idx: any) => idx % 2 === 0;

  //   We can add more columns into instance
  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }: any) => (
          <Button onClick={() => alert("Editing: " + row.values.price)}>
            Edit
          </Button>
        ),
      },
    ]);
  };

  const productsData: any = useMemo(() => [...products], [products]);

  const productColumns: any = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key: any) => key !== "rating")
            .map((key: any) => {
              if (key === "image") {
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }: any) => <img src={value} />,
                  maxWidth: "70",
                };
              }
              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableInstance = useTable(
    {
      columns: productColumns,
      data: productsData,
    },
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    state,
  } = tableInstance;

  return (
    <>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: any) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? "down" : "up") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: any, idx: any) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell: any, idx: any) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Products;
