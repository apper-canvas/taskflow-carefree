import React, { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 bg-surface border-gray-200 focus:bg-white"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;