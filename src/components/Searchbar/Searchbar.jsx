import React from 'react';
import './searchbar.css';

const Searchbar = ({ onClick, title }) => {
  return (
    <header className="searchbar-header mx-4">
      <div className="search-bar-container">
        <input type="text" placeholder="Search for Arenas" className="" />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-default" onClick={onClick}>{title}</button>
      </div>
    </header>
  );
};

export default Searchbar;
