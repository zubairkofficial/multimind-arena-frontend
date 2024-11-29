import React from "react";
import "./../AiFigures/aifigures.css";
import Logo from "../../../../public/assets/images/logo/logo.png";

export default function AIFigureCard({ figure, onSelect, isSelected }) {
  return (
    <div
      className={`aifigure-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="aifigure-card-image-wrapper">
        <img
          alt={Logo}
          className="aifigure-card-image"
          src={figure.image||Logo}
          onError={(e) => (e.target.src = Logo)} // Fallback to Logo if the image fails to load
       
        />
        <span className="aifigure-card-creator">By: @{figure.creator}</span>
      </div>
      <div className="aifigure-card-content">
        <h3 className="aifigure-card-title">{figure.name}</h3>
        <p className="aifigure-card-description text-wrap">{figure.description}</p>
      </div>
      {isSelected && (
        <div className="aifigure-card-overlay">
          <span className="tick-mark">&#10003;</span>
        </div>
      )}
    </div>
  );
}
