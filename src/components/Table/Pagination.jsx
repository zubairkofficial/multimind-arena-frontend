import React from "react";
import "./CustomTable.css"; // Import the CSS for pagination

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  entriesPerPage,
  onEntriesChange,
}) {
  const pageRange = 3; // Number of pages to show around the current page

  // Helper to determine if we need to show ellipsis
  const hasLeftEllipsis = currentPage > pageRange + 1;
  const hasRightEllipsis = currentPage < totalPages - pageRange;

  const getPagesToDisplay = () => {
    const pages = [];

    // Add the first page
    pages.push(1);

    // Add ellipsis if needed
    if (hasLeftEllipsis) pages.push("...");

    // Add pages around the current page
    const startPage = Math.max(2, currentPage - pageRange);
    const endPage = Math.min(totalPages - 1, currentPage + pageRange);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (hasRightEllipsis) pages.push("...");

    // Add the last page
    pages.push(totalPages);

    return pages;
  };

  const pages = getPagesToDisplay();

  return (
    <div className="pagination-container mt-4">
      
        {" "}
        <div className="d-flex justify-content-between pagination">
        <div className="d-flex justify-content-between">
          {/* First Page and Previous Page Arrows */}
          <div className="">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo; First
          </button>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo; Prev
          </button>

          {/* Page numbers */}
          {pages?.map((page, index) => (
            <button
              key={index}
              className={`btn btn-outline-light me-2 ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number"} // Disable ellipsis
            >
              {page}
            </button>
          ))}

          {/* Next Page and Last Page Arrows */}
          <button
            className="btn btn-outline-light me-2"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &rsaquo;
          </button>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last &raquo;
          </button>
          </div>
        </div>
        <div className="d-flex align-items-center mx-4 h-1">
            <label htmlFor="entries-select" className="me-2">
              Entries per page:
            </label>
            <select
              id="entries-select"
              value={entriesPerPage}
              onChange={(e) => onEntriesChange(parseInt(e.target.value))}
              className=" w-auto h-auto"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
      </div>

      {/* Entries per page selection */}
    </div>
  );
}
