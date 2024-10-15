import React from 'react'

const Searchbar = () => {
  return (
    <header className="dashboard-header mt-3 d-flex justify-content-center">
    <div className="search-bar mt-2 d-flex flex-1 jusitfy-content-end">
      <input type="text" placeholder="Search for Arenas" />
      <button>
        <i className="fa-sharp fa-regular fa-search"></i>
      </button>
    </div>
  </header>
  )
}

export default Searchbar