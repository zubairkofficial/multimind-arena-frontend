import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllArenaTypesQuery,
  useDeleteArenaTypeMutation,
} from "../../../../features/api/arenaApi";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Table/Pagination";
import Preloader from "../../../Landing/Preloader";
import Searchbar from "../../../../components/Searchbar/Searchbar";

export default function ManageArenaType() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  // Fetch arena types using the RTK query
  const { data: arenaTypesData, error, isLoading,refetch:arenaTypesRefech } = useGetAllArenaTypesQuery();
  const [deleteArenaType] = useDeleteArenaTypeMutation(); // Initialize the delete mutation

  const arenaTypes = arenaTypesData || [];

  // Filter arena types based on search text
  const filteredArenaTypes = arenaTypes.filter((arenaType) =>
    arenaType.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastArenaType = currentPage * entriesPerPage;
  const indexOfFirstArenaType = indexOfLastArenaType - entriesPerPage;
  const currentArenaTypes = filteredArenaTypes.slice(
    indexOfFirstArenaType,
    indexOfLastArenaType
  );
  const totalPages = Math.ceil(filteredArenaTypes.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleSearchChange = (query) => {
    setSearchText(query); // Update search text
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleCreateArenaType = () => {
    navigate("/admin/add-arena-type");
  };

  const handleEditArenaType = (arenaType) => {
    navigate(`/admin/edit-arena-type/${arenaType.id}`);
  };

  const handleDeleteArenaType = async (arenaTypeId) => {
    if (window.confirm("Are you sure you want to delete this arena type?")) {
      try {
        await deleteArenaType(arenaTypeId).unwrap();
        arenaTypesRefech()
        alert("Arena type deleted successfully.");
      } catch (error) {
        console.error("Failed to delete arena type:", error);
        alert("Failed to delete arena type.");
      }
    }
  };

  const tableHeaders = ["Arena Type Name", "Actions"];
  const tableData = currentArenaTypes.map((arenaType) => ({
    name: arenaType.name,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditArenaType(arenaType)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDeleteArenaType(arenaType.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  if (isLoading) return <Preloader />;
  if (error) return <div>Error loading arena types...</div>;



  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage Arena Types"
        placeholder="Search arena type..."
        title="Add Arena Type"
        onClick={handleCreateArenaType}
        onSearch={handleSearchChange} // Adding search functionality
      />

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
