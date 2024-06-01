import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="search-input"
        placeholder="Search for images"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
