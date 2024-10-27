import React, { useState } from "react";
import "./aifigure.css";

export default function AIFigureCard({ figure, onSelect }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelect(figure);
  };

  return (
    <div
      className={`aifigure-card ${isSelected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      <div className="aifigure-card-image-wrapper">
        <img
          alt={figure.name}
          className="aifigure-card-image"
          src="assets/images/logo/2(1).png"
        />
        <span className="aifigure-card-creator">By: @{figure.creator}</span>
      </div>
      <div className="aifigure-card-content">
        <h3 className="aifigure-card-title">{figure.name}</h3>
        <p className="aifigure-card-description">{figure.description}</p>
        <div className="aifigure-card-footer">
          <span
            className={`aifigure-card-status ${
              figure.status === "active" ? "active" : "inactive"
            }`}
          >
            {figure.status}
          </span>
        </div>
      </div>
      {isSelected && (
        <div className="aifigure-card-overlay">
          <span className="tick-mark">&#10003;</span>
        </div>
      )}
    </div>
  );
}