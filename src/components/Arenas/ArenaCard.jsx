import React from "react";
import './arenas.css';
import { Link } from "react-router-dom";

const ArenaCard = ({ arena, size = "small" , onClick}) => (
  <Link >
    <div className={`arena-card ${size}`} style={{ backgroundColor: "#202020" } } onClick ={onClick}>
      <img src={arena.image} alt={arena.name} className="arena-image" />
      <div className="arena-info">
        <h3>{arena.name}</h3>
        <p>{arena.description}</p>
        {size === "large" && (
          <span className="arena-stats">{arena.participants}</span>
        )}
      </div>
    </div>
  </Link>
);

export default ArenaCard;
