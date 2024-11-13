import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import Helpers from "../../../Config/Helpers"; // Import Helpers for the API URL
import axios from "axios";

export default function ErrorLogs() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [errorData, setErrorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch error logs from the API
  useEffect(() => {
    const fetchErrorLogs = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}error-logs`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Access the data directly
        setErrorData(response.data); // No need to parse JSON

      } catch (err) {
        // Handle error properly
        if (err.response) {
          setError(err.response.data.message || "Error fetching error logs.");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchErrorLogs();
  }, []);

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
    setCurrentPage(1);
  };

  // Table headers and formatted data for CustomTable
  const tableHeaders = ["Path", "Error Message", "Stack", "Timestamp", "Actions"];
  const tableData = currentErrors.map((error) => ({
    path: error.path,
    errorMessage: error.message,
    stack: error.stack,
    timestamp: error.timestamp,
    actions: (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => navigate(`/admin/system-status`)}
      >
        View Details
      </button>
    ),
  }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-5">
      {/* Search Bar */}
      <Searchbar
    
        placeholder="Search for Errors"
        heading="Error Logs"
        onChange={(e) => setSearchText(e.target.value)}
      />

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
