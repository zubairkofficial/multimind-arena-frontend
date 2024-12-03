import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  background: rgba(18, 18, 18, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(76, 175, 80, 0.1);
`;

const FilterCard = styled.div`
  padding: 1.5rem;
  background: rgba(16, 16, 16, 0.98);
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(76, 175, 80, 0.2);
    border-radius: 12px;
    color: white;
    font-size: 0.95rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4caf50;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
      background: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(76, 175, 80, 0.8);
    font-size: 1.1rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
  }

  option {
    background: #1a1a1a;
    color: white;
    padding: 0.5rem;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 0 -1px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(76, 175, 80, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(76, 175, 80, 0.4);
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: white;

  th, td {
    padding: 1.2rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid rgba(76, 175, 80, 0.1);
    
    @media (max-width: 768px) {
      padding: 1rem;
      font-size: 0.9rem;
    }
  }

  th {
    background: rgba(16, 16, 16, 0.98);
    font-weight: 600;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  tbody tr {
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.02);

    &:hover {
      background: rgba(76, 175, 80, 0.08);
      transform: translateY(-1px);
    }

    td {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
      vertical-align: middle;
    }
  }
`;

const EmptyMessage = styled.td`
  text-align: center;
  padding: 3rem !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 1rem !important;
  background: rgba(255, 255, 255, 0.02) !important;
`;

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
    <TableContainer>
      {(showSearch || filters.length > 0) && (
        <FilterCard>
          <FilterRow>
            {showSearch && (
              <FilterGroup>
                <Label htmlFor="search">Search:</Label>
                <SearchInput>
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    id="search"
                    value={searchText}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                  />
                </SearchInput>
              </FilterGroup>
            )}
            {filters?.map((filter, index) => (
              <FilterGroup key={index}>
                <Label htmlFor={filter.id}>{filter.label}:</Label>
                <Select
                  id={filter.id}
                  value={filter.value}
                  onChange={filter.onChange}
                >
                  <option value="">{filter.placeholder}</option>
                  {filter.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FilterGroup>
            ))}
          </FilterRow>
        </FilterCard>
      )}

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row)?.map((key, i) => (
                    <td key={i}>{row[key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <EmptyMessage colSpan={headers.length}>
                  No data available
                </EmptyMessage>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
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
