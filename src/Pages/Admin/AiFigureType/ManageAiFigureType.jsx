import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllAifigureTypesQuery,
  useDeleteAifigureTypeMutation,
} from "../../../features/api/aiFigureTypeApi";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { Notyf } from "notyf";

export default function ManageAiFigureType() {
  const navigate = useNavigate();
  const notyf = new Notyf();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [typeIdToDelete, setTypeIdToDelete] = useState(null);

  // Fetch AI figure types using the RTK query
  const { data: aifigureTypesData = [], error, isLoading, refetch } = useGetAllAifigureTypesQuery();
  const [deleteAifigureType] = useDeleteAifigureTypeMutation();

  // Filter AI figure types based on search text
  const filteredAifigureTypes = aifigureTypesData.filter((type) =>
    type.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination calculations
  const indexOfLastAifigureType = currentPage * entriesPerPage;
  const indexOfFirstAifigureType = indexOfLastAifigureType - entriesPerPage;
  const currentAifigureTypes = filteredAifigureTypes.slice(
    indexOfFirstAifigureType,
    indexOfLastAifigureType
  );
  const totalPages = Math.ceil(filteredAifigureTypes.length / entriesPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchText(query);
    setCurrentPage(1);
  };

  const handleCreateAifigureType = () => navigate("/admin/add-aifigure-type");

  const handleEditAifigureType = (aifigureType) =>
    navigate("/admin/update-aifigure-type", { state: aifigureType });

  const handleShowModal = (id) => {
    setTypeIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteAifigureType = async () => {
    try {
      await deleteAifigureType(typeIdToDelete).unwrap();
      notyf.success("AI Figure Type deleted successfully!");
      refetch();
    } catch (error) {
      notyf.error("Failed to delete AI Figure Type. Please try again.");
    } finally {
      setShowModal(false);
      setTypeIdToDelete(null);
    }
  };

  const tableHeaders = ["AI Figure Type Name", "Actions"];
  const tableData = currentAifigureTypes.map((type) => ({
    name: type.name,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditAifigureType(type)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleShowModal(type.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  if (isLoading) return <div>Loading AI figure types...</div>;
  if (error) return <div>Error loading AI figure types...</div>;

  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage AI Figure Types"
        placeholder="Search AI figure type..."
        title="Add AI Figure Type"
        onClick={handleCreateAifigureType}
        onSearch={handleSearchChange}
      />

      <div className="manage-aifigures text-light">
        <CustomTable headers={tableHeaders} data={tableData} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesChange={handleEntriesChange}
        />
      </div>

      <ConfirmationModal
        title="Confirm Deletion"
        body="Are you sure you want to delete this AI Figure Type?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteAifigureType}
      />
    </div>
  );
}
