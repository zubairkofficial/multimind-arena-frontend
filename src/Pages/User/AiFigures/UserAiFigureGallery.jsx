import React from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import "./aifigures.css";

// Dummy data for AI Figures
const aiFigures = [
  {
    name: "AI Mentor",
    emoji: "🧙‍♂️",
    role: "The Mentor / Life Coach",
  },
  {
    name: "AI Critic",
    emoji: "🧐",
    role: "The Analyst / Critic",
  },
  {
    name: "AI Entertainer",
    emoji: "🎭",
    role: "The Humorist / Entertainer",
  },
  // Add more dummy data here
];

const AIFigureGallery = () => {
  const navigate = useNavigate();

  // Handle "Create AI Figure" button click
  const handleCreateFigure = () => {
    navigate("/add-ai-figure");
  };

  return (
    <div className="ai-figure-gallery">
      <div className="d-flex justify-content-between">
      <h3 className="title">AI Figure Gallery</h3>
      <button className="btn-default"
      onClick={handleCreateFigure}>Create AI Figure</button>
      </div>
      <div className="gallery-grid">
        {aiFigures.map((figure, index) => (
          <AIFigureCard
            key={index}
            name={figure.name}
            emoji={figure.emoji}
            role={figure.role}
          />
        ))}
      </div>
    </div>
  );
};

export default AIFigureGallery;
