import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import CustomModal from "./../../../components/Modal/CustomModal";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import "./aifigures.css";
import { useLocation } from "react-router-dom";
import Preloader from "../../Landing/Preloader";
import SearchBar from "../../../components/Searchbar/Searchbar";

const AIFigureGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: aiFigures, isLoading, isError, error } = useGetAllAIFiguresQuery();

  const [filter, setFilter] = useState("All");

  const [selectedFigure, setSelectedFigure] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dynamicCategories = [...new Set(aiFigures?.map((figure) => figure.type))];
  const categories = ["All", ...dynamicCategories];

  const handleCreateFigure = () => {
    navigate("/add-ai-figure");
  };

  const handleFigureClick = (figure) => {
    setSelectedFigure(figure);
    setShowModal(true);
  };

  const handleChatNow = () => {
    if (selectedFigure) {
      navigate(`/chat/${selectedFigure.id}`, { state: selectedFigure });
    }
  };

  if (isLoading) {
    return <Preloader aria-live="polite" aria-busy="true" />;
  }

  if (isError) {
    return <div role="alert" aria-live="assertive">Error loading AI figures: {error.message}</div>;
  }

  const filteredFigures =
    filter === "All"
      ? aiFigures
      : aiFigures.filter(
          (figure) => figure.type === filter || (figure.tags && figure.tags.includes(filter))
        );

  return (
    <div className="ai-figure-gallery" aria-label="AI Figure Gallery" role="region">
      <div className="search-bar-section">
    
        <SearchBar
          title="+ AI Figure"
          onClick={handleCreateFigure}
          placeholder="Search AI Figures..."
          aria-labelledby="gallery-heading"
          heading="AI Figure Gallery"
        />
      </div>

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

      {/* CustomModal for AI Figure Details */}
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        figure={selectedFigure}
        onChatNow={handleChatNow}
      />
    </div>
  );
};

export default AIFigureGallery;
