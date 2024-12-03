import React, { useState } from "react";
import { useGetAllLlmModelsQuery, useDeleteLlmModelMutation } from "../../../features/api/llmModelApi";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Styled Components
const DashboardWrapper = styled.main`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #121212;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #17df14;
    border-radius: 3px;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #f44336;
  background: transparent;
  color: #f44336;
  margin: 0 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f44336;
    color: white;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #17df14;
  font-size: 1.2rem;
`;

const ErrorWrapper = styled.div`
  padding: 1rem;
  margin: 1rem;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: 8px;
  color: #f44336;
  text-align: center;
`;

const ApiKeyCell = styled.div`
  word-break: break-all;
  white-space: normal;
  max-width: 200px;
`;

const ManageAdminLlmModels = () => {
  const navigate = useNavigate();
  const { data: modelsData, isLoading, error, refetch } = useGetAllLlmModelsQuery();
  const [deleteLlmModel] = useDeleteLlmModelMutation();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modelIdToDelete, setModelIdToDelete] = useState(null);

  if (isLoading) return <LoadingWrapper>Loading models...</LoadingWrapper>;
  if (error) return <ErrorWrapper>Failed to load models: {error.message}</ErrorWrapper>;

  const filteredModels = modelsData?.filter((model) =>
    model.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastModel = currentPage * entriesPerPage;
  const indexOfFirstModel = indexOfLastModel - entriesPerPage;
  const currentModels = filteredModels?.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(filteredModels?.length / entriesPerPage);

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
  const handleCreateLlmModel = () => {
    navigate('/admin/create-llm');
  };

  const tableHeaders = ["Name", "API Key", "Model Type", "Actions"];
  const tableData = currentModels?.map((model) => ({
    name: model.name,
    apiKey: (
      <ApiKeyCell>
        {model.apiKey}
      </ApiKeyCell>
    ),
    modelType: model.modelType,
    actions: (
      <ActionButton
        onClick={() => {
          setModelIdToDelete(model.id);
          setShowDeleteModal(true);
        }}
      >
        <i className="fas fa-trash"></i>
      </ActionButton>
    ),
  }));

  return (
    <DashboardWrapper>
      <Container>
        <Searchbar
          heading="Manage LLM Models"
          title="Create LLM Model"
          placeholder="Search models..."
          onClick={handleCreateLlmModel}
          onSearch={handleSearchChange}
        />

        <TableWrapper>
          <CustomTable headers={tableHeaders} data={tableData} />
        </TableWrapper>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesChange={handleEntriesChange}
        />

        <ConfirmationModal
          title="Confirm Deletion"
          body="Are you sure you want to delete this model?"
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteModel}
        />
      </Container>
    </DashboardWrapper>
  );
};

export default ManageAdminLlmModels;
