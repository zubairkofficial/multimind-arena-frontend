import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import "./aifigures.css";
import { useLocation } from "react-router-dom";
import Preloader from "./../../Landing/Preloader";
import SearchBar from "../../../components/Searchbar/Searchbar";
import { Modal, Button } from "react-bootstrap";


const AIFigureGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch AI figures using the query hook
  const { data: aiFigures, isLoading, isError, error } = useGetAllAIFiguresQuery();

  // Filter state to keep track of selected category
  const [filter, setFilter] = useState("All");

  // Modal state to show selected AI figure details
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Unique categories based on AI figure types
  const dynamicCategories = [...new Set(aiFigures?.map((figure) => figure.type))];

  // Combine dynamic and predefined categories
  const categories = ["All", ...dynamicCategories];

  // Handle "Create AI Figure" button click
  const handleCreateFigure = () => {
    navigate("/add-ai-figure");
  };

  // Handle AI Figure click to show modal
  const handleFigureClick = (figure) => {
    console.log(figure);
    setSelectedFigure(figure);
    setShowModal(true);
  };

  // Handle "Chat Now" button click inside the modal
  const handleChatNow = () => {
    if (selectedFigure) {
      navigate(`/chat/${selectedFigure.id}`, {state: selectedFigure});
    }
  };

  // Render loading or error states
  if (isLoading) {
    return <Preloader aria-live="polite" aria-busy="true" />;
  }

  if (isError) {
    return <div role="alert" aria-live="assertive">Error loading AI figures: {error.message}</div>;
  }

  // Filter AI figures based on selected category
  const filteredFigures =
    filter === "All"
      ? aiFigures
      : aiFigures.filter(
          (figure) =>
            figure.type === filter || (figure.tags && figure.tags.includes(filter))
        );

  return (
    <div className="ai-figure-gallery" aria-label="AI Figure Gallery" role="region">
      <div className="search-bar-section">
        <h2 className="dashboard-title" id="gallery-heading">
          AI Figure Gallery
        </h2>
        <SearchBar
          title="+ AI Figure"
          onClick={handleCreateFigure}
          placeholder="Search AI Figures..."
          aria-labelledby="gallery-heading"
        />
      </div>

      {/* Category selection menu */}
      <div className="category-menu d-flex mb-3" role="navigation" aria-label="Category Filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${filter === category ? "active" : ""}`}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid" aria-labelledby="gallery-heading" role="grid">
        {filteredFigures.map((figure) => (
          <AIFigureCard
            key={figure.id}
            figure={figure}
            role="gridcell"
            onSelect={() => handleFigureClick(figure)}
          />
        ))}
      </div>

      {/* Bootstrap Dark Modal for AI Figure Details */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="modal-dark"
      >
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title>{selectedFigure?.name}</Modal.Title>
        </Modal.Header >
        <Modal.Body className="bg-dark">
          <div className="text-center mb-4">
            <img
              src={selectedFigure?.image || "/assets/images/logo/logo.png"}
              alt={selectedFigure?.name}
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <p>{selectedFigure?.description}</p>
          <p>Type: {selectedFigure?.type}</p>
          <p>Tags: {selectedFigure?.tags?.join(", ")}</p>
        </Modal.Body>
        <Modal.Footer>
    
        <button className="btn-default btn-small" onClick={handleChatNow}>Chat Now</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AIFigureGallery;
