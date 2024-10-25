import React, { useState } from "react";
import { Clock, Info, Users } from "lucide-react";
import "./ArenaCard.css";

export default function ArenaCard({ arena, onJoin }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const formatTime = (expiryTime) => {
    const date = new Date(expiryTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleInfoMouseEnter = (event) => {
    setIsInfoHovered(true);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleInfoMouseLeave = () => {
    setIsInfoHovered(false);
  };

  return (
    <div className="arena-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="arena-card-image-wrapper">
        <img
          alt={arena.name}
          className="arena-card-image"
          src={arena.image}
        />
      </div>
      <div className="arena-card-content">
        <h3 className="arena-card-title">{arena.name}</h3>
        <div className="arena-card-description">{arena.description}</div>
        <div className="arena-info">
          <div className="d-flex align-items-center">
            <Users className="me-2" size={18} />
            <span>{arena.userArenas.length}/{arena.maxParticipants}</span>
          </div>
          <div className="d-flex align-items-center">
            <Clock className="me-2" size={18} />
            <span>{formatTime(arena.expiryTime)}</span>
          </div>
          <div
            className="d-flex align-items-center position-relative"
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
          >
            <Info className="me-2" size={18} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="arena-card-footer">
          <button className="btn custom-btn" onClick={onJoin}>
            Join Arena
          </button>
          <div className=" d-flex gap-4">
          <span className={`arena-card-status ${arena.status === "open" ? "active" : "inactive"}`}>
            {arena.arenaType.name}
          </span>
          <span className={`arena-card-status ${arena.status === "open" ? "active" : "inactive"}`}>
            {arena.status}
          </span>
        
          </div>
        </div>
      </div>
  
      {isInfoHovered && (
        <div
          style={{
            position: "fixed",
            top: tooltipPosition.y + 15, // Offset to appear slightly below the cursor
            left: tooltipPosition.x + 15, // Offset to appear slightly to the right of the cursor
            zIndex: 1000,
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "200px",
          }}
        >
          <p><strong>Description:</strong> {arena.description}</p>
          <p><strong>Created by:</strong> @{arena.createdBy.username}</p>
        </div>
      )}
    </div>
  );
}
