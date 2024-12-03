import React, { useState, useEffect } from "react";
import {
  useGetAllAIFiguresQuery,
  useAddAIFigureMutation,
  useDeleteAIFigureMutation,
  useUpdateAIFigureMutation,
} from "../../../features/api/aiFigureApi";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import { Modal, Button, Form } from "react-bootstrap";
import "./aifigures.css";

import { useNavigate } from "react-router";

const ManageAiFigures = () => {
  const { data: aiFiguresData, error, isLoading } = useGetAllAIFiguresQuery();
  const [addAIFigure] = useAddAIFigureMutation();
  const [deleteAIFigure] = useDeleteAIFigureMutation();
  const [updateAIFigure] = useUpdateAIFigureMutation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" or "edit"
  const [selectedFigure, setSelectedFigure] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch AI figures", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading AI figures...</div>;
  }

  const handleSearchChange = (query) => {
    setSearchText(query); // Update search text state directly
  };

  const filteredData = aiFiguresData?.filter((figure) =>
    figure.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastFigure = currentPage * entriesPerPage;
  const indexOfFirstFigure = indexOfLastFigure - entriesPerPage;
  const currentFigures = filteredData?.slice(
    indexOfFirstFigure,
    indexOfLastFigure
  );
  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1);
  };

  const handleAddFigure = () => {
    navigate("/admin/add-ai-figure");
  };

  const handleEditFigure = (figure) => {
   
    navigate("/admin/update-ai-figure",{state:figure})
    
 
  };

  const handleDeleteFigure = async (figureId) => {
    await deleteAIFigure(figureId);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFigure = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    if (modalType === "add") {
      await addAIFigure(newFigure);
    } else if (modalType === "edit" && selectedFigure) {
      await updateAIFigure({
        figureId: selectedFigure.id,
        updatedAIFigure: newFigure,
      });
    }

    setShowModal(false);
  };

  const tableHeaders = ["Name", "Description", "Actions"];
  const tableData = currentFigures?.map((figure) => ({
    name: figure.name,
    description: figure.description,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditFigure(figure)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDeleteFigure(figure.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage AI Figures"
        title="Add AI Figure"
        placeholder="Search AI Figures..."
        onClick={handleAddFigure}
        onSearch={handleSearchChange} // Replace onChange with onSearch
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add AI Figure" : "Edit AI Figure"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={selectedFigure?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={selectedFigure?.description || ""}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAiFigures;
