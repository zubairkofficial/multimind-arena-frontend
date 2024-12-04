import React from "react";
import "./aifigures.css";
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaType } from "../../../common";
import { FaUser, FaLock, FaGlobe } from 'react-icons/fa';

export default function AIFigureCard({ figure, onSelect }) {
  console.log("figure.isAiPrivate",figure.isAiPrivate)
  return (
    <div className="aifigure-card" onClick={() => onSelect(figure)}>
      <div className="aifigure-card-image-wrapper">
        <img
          alt={figure.name}
          className="aifigure-card-image"
          src={figure.image || Logo}
          onError={(e) => (e.target.src = Logo)}
        />
        <div className="aifigure-card-badges">
          <span className="privacy-badge">
            {figure.isAiPrivate ? 
              <><FaLock /> {ArenaType.PRIVATE}</> : 
              <><FaGlobe /> {ArenaType.PUBLIC}</>
            }
          </span>
        </div>
      </div>
      <div className="aifigure-card-content">
        <div className="creator-info">
          <FaUser className="creator-icon" />
          <span className="creator-name">Arena1</span>
        </div>
        <h3 className="aifigure-card-title">{figure.name}</h3>
        <p className="aifigure-card-description">{figure.description}</p>
      </div>
    </div>
  );
}
