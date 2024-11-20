import React, { useState } from "react";
import { useGetAllLlmModelsQuery, useDeleteLlmModelMutation } from "../../../features/api/llmModelApi";
// import CreateAdminLlmModel from "./CreateAdminLlmModel";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";


const ManageAdminLlmModels = () => {
  const navigate=useNavigate()
  const { data: modelsData, isLoading, error, refetch } = useGetAllLlmModelsQuery();
  const [deleteLlmModel] = useDeleteLlmModelMutation();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modelIdToDelete, setModelIdToDelete] = useState(null);

  if (isLoading) return <div>Loading models...</div>;
  if (error) return <div>Failed to load models: {error.message}</div>;

  // Filter models based on search input
  const filteredModels = modelsData?.filter((model) =>
    model.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Pagination logic
  const indexOfLastModel = currentPage * entriesPerPage;
  const indexOfFirstModel = indexOfLastModel - entriesPerPage;
  const currentModels = filteredModels?.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(filteredModels?.length / entriesPerPage);

  // Event Handlers
  const handleSearchChange = (query) => setSearchText(query);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleEntriesChange = (entries) => {
    setEntriesPerPage(entries);
    setCurrentPage(1);
  };
  const handleDeleteModel = async () => {
    if (modelIdToDelete) {
      await deleteLlmModel(modelIdToDelete);
      refetch();
      setModelIdToDelete(null);
    }
    setShowDeleteModal(false);
  };
const handleCreateLlmModel=()=>{
  navigate('/admin/create-llm')
}
  // Table Headers
  const tableHeaders = ["Name", "API Key", "Model Type", "Actions"];
  const tableData = currentModels?.map((model) => ({
    name: model.name,
    apiKey: model.apiKey,
    modelType: model.modelType,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            setModelIdToDelete(model.id);
            setShowDeleteModal(true);
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div className="container mx-5">
      <Searchbar
        heading="Manage LLM Models"
        title="Create LLM Model"
        placeholder="Search models..."
        onClick={ handleCreateLlmModel}
        onSearch={handleSearchChange}
      />

      <CustomTable headers={tableHeaders} data={tableData} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        entriesPerPage={entriesPerPage}
        onEntriesChange={handleEntriesChange}
      />

      {/* Create LLM Model Modal */}
      {showCreateModal && (
        <div className="modal-wrapper">
          {/* <CreateAdminLlmModel /> */}
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        title="Confirm Deletion"
        body="Are you sure you want to delete this model?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteModel}
      />
    </div>
  );
};

export default ManageAdminLlmModels;
