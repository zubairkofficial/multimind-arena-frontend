import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import "./aifigures.css";
import Preloader from "./../../Landing/Preloader";
import SearchBar from "../../../components/Searchbar/Searchbar";

const AIFigureGallery = () => {
  const navigate = useNavigate();

  // Fetch AI figures using the query hook
  const { data: aiFigures, isLoading, isError, error } = useGetAllAIFiguresQuery();

  // Filter state to keep track of selected category
  const [filter, setFilter] = useState("All");

  // Additional predefined categories

  // Unique categories based on AI figure types
  const dynamicCategories = [...new Set(aiFigures?.map((figure) => figure.type))];

  // Combine dynamic and predefined categories
  const categories = ["All", ...dynamicCategories];

  // Handle "Create AI Figure" button click
  const handleCreateFigure = () => {
    navigate("/add-ai-figure");
  };

  // Render loading or error states
  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <div>Error loading AI figures: {error.message}</div>;
  }

  // Filter AI figures based on selected category
  const filteredFigures = filter === "All"
    ? aiFigures
    : aiFigures.filter((figure) =>
        figure.type === filter || (figure.tags && figure.tags.includes(filter))
      );

  return (
    <div className="ai-figure-gallery">
        <div className="search-bar-section">
          <h2 className="dashboard-title">Find Your Arena</h2>
          <SearchBar 
          title="Create AI Figure"
          onClick={handleCreateFigure}
          placeholder="Search for arenas..." />
        </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="title">AI Figure Gallery</h3>
        <button className="btn-default" onClick={handleCreateFigure}>
          Create AI Figure
        </button>
      </div>

      {/* Category selection menu */}
      <div className="category-menu d-flex mb-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${filter === category ? "active" : ""}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredFigures.map((figure) => (
          <AIFigureCard key={figure.id} figure={figure} />
        ))}
      </div>
    </div>
  );
};

export default AIFigureGallery;
