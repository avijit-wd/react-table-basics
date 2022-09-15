import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";

const SearchContainer = tw.div`
    mb-6
    mt-6
    flex
    items-center
`;

const SearchText = tw.h2`
    text-xl
    text-gray-600
    mr-6
`;

const Input = tw.input`
    h-8
    border-2
    border-solid
    border-green-500
    outline-none
    p-4
    rounded-lg
`;

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const handleChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <SearchContainer>
      <SearchText>Search :</SearchText>
      <Input
        value={value || ""}
        onChange={(e: any) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
        placeholder={`${count} records`}
      />
    </SearchContainer>
  );
};

export default GlobalFilter;
