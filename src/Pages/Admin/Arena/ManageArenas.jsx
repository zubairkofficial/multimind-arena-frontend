import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllArenasQuery } from "./../../../features/api/arenaApi";
import CustomTable from "../../../components/Table/CustomTable"; // Import the reusable table component
import Pagination from "../../../components/Table/Pagination"; // Import the pagination component

export default function ManageArenas() {
  const navigate = useNavigate();
  const { data: arenasData, error, isLoading } = useGetAllArenasQuery();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // New state for entries per page

  const arenaTypes = ["Debate", "Game", "Casual Chat"];
  const statuses = ["Open", "In Progress", "Full"];

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch arenas", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading arenas...</div>;
  }

  // Format data for the table
  const formattedData = arenasData?.map((arena) => ({
    id: arena.id,
    title: arena.name,
    type: arena.arenaType?.name || "Unknown",
    aiFigure: arena.aiFigures?.name || "None",
    expirySession: arena.expiryTime ? new Date(arena.expiryTime).toLocaleDateString() : "N/A",
    status: arena.status.charAt(0).toUpperCase() + arena.status.slice(1),
  }));

  // Modify the filtering logic to search across multiple fields
  const filteredData = formattedData?.filter((item) => {
    const searchLowerCase = searchText.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchLowerCase) ||
      item.type.toLowerCase().includes(searchLowerCase) ||
      item.aiFigure.toLowerCase().includes(searchLowerCase) ||
      item.status.toLowerCase().includes(searchLowerCase);

    const matchesType = filterType ? item.type === filterType : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  const indexOfLastArena = currentPage * entriesPerPage;
  const indexOfFirstArena = indexOfLastArena - entriesPerPage;
  const currentArenas = filteredData?.slice(indexOfFirstArena, indexOfLastArena);
  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleCreateArena = () => {
    navigate("/admin/add-arena");
  };

  const tableHeaders = [
    "Arena Name",
    "Type",
    "AI Figure",
    "Expiry Session",
    "Status",
    "Actions",
  ];
  const tableData = currentArenas?.map((arena) => ({
    title: arena.title,
    type: arena.type,
    aiFigure: arena.aiFigure,
    expirySession: arena.expirySession,
    status: (
      <span
        className={`badge ${
          arena.status === "Open"
            ? "bg-success"
            : arena.status === "In Progress"
            ? "bg-warning"
            : "bg-danger"
        }`}
      >
        {arena.status}
      </span>
    ),
    actions: (
      <>
        <button className="btn btn-sm btn-outline-success me-2">
          <i className="fas fa-edit"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Arenas</h2>
        <button className="btn-default" onClick={handleCreateArena}>
          Create Arena
        </button>
      </div>
      {/* Search Bar */}
      <div className="search-bar-container mb-3">
        <input
          type="text"
          placeholder="Search by arena name, type, AI figure, or status"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="manage-arenas text-light">
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
