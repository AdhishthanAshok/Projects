import React from "react";
import "../App.css";

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((result) => (
        <div key={result.id} className="search-result">
          <a href={result.links.html} target="_blank" rel="noopener noreferrer">
            <img src={result.urls.small} alt={result.alt_description} />
            {result.alt_description}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
