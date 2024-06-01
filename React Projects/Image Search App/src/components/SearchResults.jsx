import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((result) => (
        <div key={result.id} className="search-result">
          <img src={result.urls.small} alt={result.alt_description} />
          <a href={result.links.html} target="_blank" rel="noopener noreferrer">
            {result.alt_description}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
