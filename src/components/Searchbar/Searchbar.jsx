import React from "react";
import "./searchbar.css";

const Searchbar = ({ heading, onClick, title, placeholder }) => {
  return (
    <header className="searchbar-header mx-4">
      <div className="d-flex justify-content-center">
        <h4>{heading}</h4>
      </div>
      <div className="d-flex justify-content-between">
        <div className="search-bar-container">
          <input type="text" placeholder={placeholder} className="" />
          <button className="search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
        {/* Render the button only if title prop is provided */}
        {title && (
          <div className="d-flex align-items-center">
            <button className="btn btn-default" onClick={onClick}>
              {title}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Searchbar;
