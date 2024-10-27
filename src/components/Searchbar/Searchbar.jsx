import React from 'react';
import './searchbar.css';

const Searchbar = ({onClick,title}) => {
  return (
    <header className="d-flex justify-content-between">
      <div className="search-bar-container">
        <input type="text" placeholder="Search for Arenas" className="search-input" />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <button className='btn btn-default' onClick={onClick}>{title}</button>
    </header>
  );
};

export default Searchbar;
