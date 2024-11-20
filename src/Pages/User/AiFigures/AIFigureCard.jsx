import React from "react";
import "./aifigures.css";

export default function AIFigureCard({ figure, onSelect }) {

 console.log("figure==========",figure)
  return (
    <div className="aifigure-card w-100" onClick={() => onSelect(figure)}>
      <div className="aifigure-card-image-wrapper">
        <img
          alt={figure.name}
          className="aifigure-card-image"
          src={figure.image}
        />
      </div>
      <div className="aifigure-card-content">
      <span className="aifigure-card-creator">By: <span style={{color:"#4caf50",fontWeight:"bold"}}> Arena1</span></span>

        <h3 className="aifigure-card-title mb-0">{figure.name}</h3>
        <p className="aifigure-card-description">{figure.description}</p>
     
      </div>
    </div>
  );
}
