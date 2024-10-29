import React from "react";
import "./aifigures.css";

export default function AIFigureCard({ figure, onSelect }) {

 
  return (
    <div className="aifigure-card" onClick={() => onSelect(figure)}>
      <div className="aifigure-card-image-wrapper">
        <img
          alt={figure.name}
          className="aifigure-card-image"
          src={figure.image}
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
    </div>
  );
}
