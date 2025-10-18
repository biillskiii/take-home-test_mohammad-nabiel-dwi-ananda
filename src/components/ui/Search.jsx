import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = ({ value, onChange, placeholder = "Search...." }) => {
  return (
    <div className="flex items-center gap-x-2 border border-white rounded-lg px-3 py-2 w-40 max-w-md ">
      <CiSearch className="text-white text-xl" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none text-white bg-transparent placeholder-white"
      />
    </div>
  );
};

export default Search;
