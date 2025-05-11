import React, { useState } from "react";

const SearchPagination = ({
  searchTerm,
  setSearchTerm,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    setPage(1);
    if (onSearch) onSearch(inputValue);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          className="input input-bordered w-48"
        />
        <button type="submit" className="btn bg-[#54b689] text-white">
          Search
        </button>
      </form>
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="font-medium">
          Show
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="select select-bordered"
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <span>per page</span>
      </div>
      {totalPages > 1 && (
        <div className="flex gap-1 ml-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num + 1)}
              className={`btn btn-xs ${
                page === num + 1 ? "bg-[#54b689] text-white" : "bg-gray-200"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPagination;
