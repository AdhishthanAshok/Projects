import React, { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm.jsx";
import SearchResults from "./components/SearchResults.jsx";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async (searchQuery, pageNumber = 1) => {
    const accessKey = import.meta.env.VITE_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchQuery}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (pageNumber === 1) {
      setSearchResults(data.results);
    } else {
      setSearchResults((prevResults) => [...prevResults, ...data.results]);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <div className="App">
      <h1>Image Search App</h1>
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={searchResults} />
      {searchResults.length > 0 && (
        <button id="show-more-button" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default App;
