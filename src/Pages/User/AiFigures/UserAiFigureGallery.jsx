import React from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi"; // Import the query hook
import "./aifigures.css";
import Preloader from './../../Landing/Preloader'

const AIFigureGallery = () => {
  const navigate = useNavigate();

  // Fetch AI figures using the query hook
  const { data: aiFigures, isLoading, isError, error } = useGetAllAIFiguresQuery();

  // Handle "Create AI Figure" button click
  const handleCreateFigure = () => {
    navigate("/add-ai-figure");
  };

  // Render loading or error states
  if (isLoading) {
    return <Preloader/>;
  }

  if (isError) {
    return <div>Error loading AI figures: {error.message}</div>;
  }

  return (
    <div className="ai-figure-gallery">
      <div className="d-flex justify-content-between">
        <h3 className="title">AI Figure Gallery</h3>
        <button className="btn-default" onClick={handleCreateFigure}>
          Create AI Figure
        </button>
      </div>
      <div className="gallery-grid">
        {aiFigures.map((figure) => (
          <AIFigureCard
            figure={figure} // Assuming the description is part of the figure data
          />
        ))}
      </div>
    </div>
  );
};

export default AIFigureGallery;
