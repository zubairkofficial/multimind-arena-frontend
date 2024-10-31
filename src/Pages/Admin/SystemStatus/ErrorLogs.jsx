import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Table/CustomTable"; // Import the reusable table component
import Pagination from "../../../components/Table/Pagination"; // Import the pagination component
import Searchbar from "../../../components/Searchbar/Searchbar";
export default function ErrorLogs() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  // Hardcoded error data
  const errorData = [
    {
      path: "/api/v1/users",
      errorMessage: "Internal Server Error",
      stack: "Error: Internal Server Error at /api/v1/users",
      timestamp: "2024-10-30 14:30",
    },
    {
      path: "/api/v1/auth",
      errorMessage: "Unauthorized Access",
      stack: "Error: Unauthorized Access at /api/v1/auth",
      timestamp: "2024-10-30 14:25",
    },
    {
      path: "/api/v1/data",
      errorMessage: "Data Not Found",
      stack: "Error: Data Not Found at /api/v1/data",
      timestamp: "2024-10-30 14:20",
    },
    // Add more error entries as needed
  ];

  // Filter data based on search text
  const filteredData = errorData.filter((item) =>
    Object.values(item).some((value) =>
      value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastError = currentPage * entriesPerPage;
  const indexOfFirstError = indexOfLastError - entriesPerPage;
  const currentErrors = filteredData.slice(indexOfFirstError, indexOfLastError);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page
  };

  // Table headers and formatted data for CustomTable
  const tableHeaders = [
    "Path",
    "Error Message",
    "Stack",
    "Timestamp",
    "Actions",
  ];
  const tableData = currentErrors.map((error) => ({
    path: error.path,
    errorMessage: error.errorMessage,
    stack: error.stack,
    timestamp: error.timestamp,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate(`/admin/system-status`)}
        >
          View Details
        </button>
      </>
    ),
  }));

  return (
    <div>

      {/* Search Bar */}
      <Searchbar title= "Error Logs" placeholder="Search for Errors" heading="Error Logs" />

      <div className="error-logs text-light">
        <CustomTable headers={tableHeaders} data={tableData} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesChange={handleEntriesChange}
        />
      </div>
    </div>
  );
}
