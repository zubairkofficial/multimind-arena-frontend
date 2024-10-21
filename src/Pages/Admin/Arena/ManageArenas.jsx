import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "./../../../components/Table/CustomTable"; // Import the reusable table component
import Pagination from "./../../../components/Table/Pagination"; // Import the pagination component

export default function ManageArenas() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // New state for entries per page

  const arenaTypes = ["Debate", "Game", "Casual Chat"];
  const statuses = ["Open", "In Progress", "Full"];

  const dummyData = [
    {
      id: 1,
      title: "Arena 1",
      type: "Game",
      aiFigure: "Einstein",
      expirySession: "2024-12-31",
      status: "Open",
    },
    {
      id: 2,
      title: "Arena 2",
      type: "Debate",
      aiFigure: "Socrates",
      expirySession: "2025-01-15",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Arena 3",
      type: "Casual Chat",
      aiFigure: "Cleopatra",
      expirySession: "2025-02-10",
      status: "Full",
    },
    {
      id: 4,
      title: "Arena 4",
      type: "Game",
      aiFigure: "Newton",
      expirySession: "2025-03-20",
      status: "Open",
    },
    {
      id: 5,
      title: "Arena 5",
      type: "Debate",
      aiFigure: "Aristotle",
      expirySession: "2025-04-10",
      status: "Full",
    },
  ];

  // Modify the filtering logic to search across multiple fields
  const filteredData = dummyData.filter((item) => {
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
  const currentArenas = filteredData.slice(indexOfFirstArena, indexOfLastArena);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

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
  const tableData = currentArenas.map((arena) => ({
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
    <div >
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
