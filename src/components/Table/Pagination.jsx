import React from "react";
import styled from 'styled-components';

const PaginationContainer = styled.div`
  padding: 1rem 1.5rem;
  background: rgba(16, 16, 16, 0.98);
  border-top: 1px solid rgba(76, 175, 80, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'rgba(76, 175, 80, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#4caf50' : 'rgba(76, 175, 80, 0.2)'};
  border-radius: 8px;
  color: ${props => props.active ? '#4caf50' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 0.9rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(76, 175, 80, 0.1);
    border-color: #4caf50;
    transform: translateY(-1px);
  }

  @media (max-width: 576px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
`;

const EntriesPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  white-space: nowrap;
`;

const Select = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.75rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.15);
  }

  option {
    background: #1a1a1a;
    color: white;
    padding: 0.5rem;
  }
`;

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  entriesPerPage,
  onEntriesChange,
}) {
  const pageRange = 3;
  const hasLeftEllipsis = currentPage > pageRange + 1;
  const hasRightEllipsis = currentPage < totalPages - pageRange;

  const getPagesToDisplay = () => {
    const pages = [];
    pages.push(1);
    if (hasLeftEllipsis) pages.push("...");
    
    const startPage = Math.max(2, currentPage - pageRange);
    const endPage = Math.min(totalPages - 1, currentPage + pageRange);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (hasRightEllipsis) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <ButtonGroup>
          <PaginationButton
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo; First
          </PaginationButton>
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo; Prev
          </PaginationButton>

          {getPagesToDisplay().map((page, index) => (
            <PaginationButton
              key={index}
              active={currentPage === page}
              disabled={typeof page !== "number"}
              onClick={() => typeof page === "number" && onPageChange(page)}
            >
              {page}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &rsaquo;
          </PaginationButton>
          <PaginationButton
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last &raquo;
          </PaginationButton>
        </ButtonGroup>

        <EntriesPerPage>
          <Label htmlFor="entries-select">Entries per page:</Label>
          <Select
            id="entries-select"
            value={entriesPerPage}
            onChange={(e) => onEntriesChange(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
        </EntriesPerPage>
      </PaginationWrapper>
    </PaginationContainer>
  );
}
