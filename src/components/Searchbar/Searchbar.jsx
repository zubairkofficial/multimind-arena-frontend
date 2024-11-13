// Searchbar.js
import React, { useState } from "react";
import "./searchbar.css";

const Searchbar = ({ heading, onClick, title, placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle input change and trigger search function on each change
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  return (
    <header className="searchbar-header mx-4">
      <div className="d-flex justify-content-center">
        <h4>{heading}</h4>
      </div>
      {/* <div className="d-flex justify-content-between"> */}
        <div className="row">
        <div className="col-md-4 col-12">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="searchbar-input"
          />
          <button className="search-button" onClick={() => onSearch(searchQuery)}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        </div>
        <div className="col-md-4"></div>
        {/* Render the additional button if title prop is provided */}
        <div className="col-md-4 col-12 mt-2 text-center">
  {title && (
    <div className="align-items-end">
      <button className="btn btn-default" onClick={onClick}>
        {title}
      </button>
    </div>
  )}
</div>

        </div>
      {/* </div> */}
    </header>
  );
};

export default Searchbar;
