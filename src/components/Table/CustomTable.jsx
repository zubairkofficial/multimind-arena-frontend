import React from 'react';
import PropTypes from 'prop-types';
import './CustomTable.css'; // Assuming your existing styles are in here

const CustomTable = ({
  headers,
  data,
  showSearch = false,  // Optional prop to show the search bar
  searchPlaceholder = 'Search...',
  searchText = '',
  onSearchChange = () => {},
  filters = [],  // Optional prop to show custom filters
}) => {
  return (
    <div className="custom-table-container">
      {/* Render the card div with search and filters only if showSearch or filters are passed */}
      {(showSearch || filters.length > 0) && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              {showSearch && (
                <div className="col-md-4">
                  <label htmlFor="search" className="form-label">
                    Search:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      id="search"
                      value={searchText}
                      onChange={onSearchChange}
                      placeholder={searchPlaceholder}
                      className="form-control"
                    />
                  </div>
                </div>
              )}
              {/* Render custom filters passed as props */}
              {filters.map((filter, index) => (
                <div className="col-md-4" key={index}>
                  <label htmlFor={filter.id} className="form-label">
                    {filter.label}:
                  </label>
                  <select
                    id={filter.id}
                    value={filter.value}
                    onChange={filter.onChange}
                    className="form-select custom-select"
                  >
                    <option value="">{filter.placeholder}</option>
                    {filter.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render the table */}
      <table className="table-hover table-bordered">
        <thead> 
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key, i) => (
                  <td key={i}>{row[key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Define prop types for the component
CustomTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showSearch: PropTypes.bool, // Control whether to show the search bar
  searchPlaceholder: PropTypes.string, // Placeholder for the search input
  searchText: PropTypes.string, // Search text input value
  onSearchChange: PropTypes.func, // Handler for search input change
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ), // Custom filter options
};

export default CustomTable;
