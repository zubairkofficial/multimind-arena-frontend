import React, { useState } from "react";
import "./searchbar.css";

const Searchbar = ({ heading, onClick, title, placeholder, onSearch,style }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  return (
    <header className="searchbar-header mx-4">
      <div className="row align-items-center mt-3">
        {/* Heading aligned to the left */}
        <div className="col-md-6 col-12 text-start mt-3">
          <h6 className={`searchbar-heading ${style?"":"fs-5"} font-bold`} style={style}>{heading}</h6>
        </div>

        {/* Button aligned to the right */}
        <div className="col-md-6 col-12 text-md-end text-start mt-3">
          {title && (
            <div>
              <button className="btn-small btn-default " onClick={onClick}>
                <span className="p-2">{title}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search input positioned below */}
      <div className="row mt-3">
        <div className="col-md-6 col-12 offset-md-6 text-end">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              className="search-input-small rounded-0"
            />
            <button
              className="search-button"
              onClick={() => onSearch(searchQuery)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Searchbar;
