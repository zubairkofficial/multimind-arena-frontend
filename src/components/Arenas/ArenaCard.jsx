import React from "react";
import './arenas.css'


const ArenaCard = ({ arena, size = "small" }) => (
    <div className={`arena-card ${size}`}>
      <img src={arena.image} alt={arena.name} className="arena-image" />
      <div className="arena-info">
        <h3>{arena.name}</h3>
        <p>{arena.description}</p>
        {size === "large" && (
          <span className="arena-stats">{arena.participants}</span>
        )}
      </div>
    </div>
  );
  export default ArenaCard
