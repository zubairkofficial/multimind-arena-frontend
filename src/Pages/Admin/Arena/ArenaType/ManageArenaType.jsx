import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllArenaTypesQuery } from "../../../../features/arenaSlice";
import CustomTable from "../../../../components/Table/CustomTable";
import Pagination from "../../../../components/Table/Pagination";

export default function ManageArenaType() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  // Fetch arena types using the RTK query
  const { data: arenaTypesData, error, isLoading } = useGetAllArenaTypesQuery();

  const arenaTypes = arenaTypesData || [];

  // Pagination calculations
  const indexOfLastArenaType = currentPage * entriesPerPage;
  const indexOfFirstArenaType = indexOfLastArenaType - entriesPerPage;
  const currentArenaTypes = arenaTypes.slice(indexOfFirstArenaType, indexOfLastArenaType);
  const totalPages = Math.ceil(arenaTypes.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleCreateArenaType = () => {
    navigate("/admin/add-arena-type");
  };

  const tableHeaders = ["Arena Type Name", "Actions"];
  const tableData = currentArenaTypes.map((arenaType) => ({
    name: arenaType.name,
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading arena types...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Arena Types</h2>
        <button className="btn-default" onClick={handleCreateArenaType}>
          Create Arena Type
        </button>
      </div>

      <div className="manage-arena-types text-light">
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
