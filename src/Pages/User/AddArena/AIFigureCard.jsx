import React from "react";
import "./aifigure.css";

export default function AIFigureCard({ figure, onSelect, isSelected }) {
  return (
    <div
      className={`aifigure-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="aifigure-card-image-wrapper">
        <img
          alt={figure.name}
          className="aifigure-card-image"
          src={figure.image}
        />
        <span className="aifigure-card-creator">By: @{figure.creator}</span>
        {isSelected && (
          <div className="aifigure-card-overlay">
            <span className="tick-mark">✔</span>
          </div>
        )}
      </div>
      <div className="aifigure-card-content">
        <h3 className="aifigure-card-title">{figure.name}</h3>
        <p className="aifigure-card-description">{figure.description}</p>
      </div>
    </div>
  );
}
