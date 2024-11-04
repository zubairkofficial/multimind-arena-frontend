import React, { useState } from "react";
import { Clock, Info, Users } from "lucide-react";
import "./ArenaCard.css";

export default function ArenaCard({ arena, onJoin }) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const formatTime = (expiryTime) => {
    if (!expiryTime) return "No Expiry"; // Return "No Expiry" if expiryTime is null
    const date = new Date(expiryTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
    <div className="arena-card m-3 h-20">
      <div className="arena-card-image-wrapper">
        <img alt={arena.name} className="arena-card-image" src={arena.image || 'assets/images/logo/logo.png'} />
      </div>
      <div className="arena-card-content">
        <h3 className="arena-card-title">{arena.name}</h3>
        <div className="arena-card-description">{arena.description}</div>
        <div className="arena-info">
          <div className="arena-info-item">
            <Users className="icon mx-2"  size={14} />
          
            <span>{arena.userArenas.length}/{arena.maxParticipants === 0 ? "Unlimited" : arena.maxParticipants}</span>
            </div>
          <div className="arena-info-item ">
            <Clock className="icon mx-2"  size={14}  />
            <span>{formatTime(arena.expiryTime)}</span>
          </div>
          <div
            className="arena-info-item info-hover"
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
          >
            <Info className="icon" size={14}  />
          </div>
        </div>
        <div className="arena-card-footer">
          <button className="btn custom-btn" onClick={onJoin}>Join Arena</button>
          <div className="arena-status">
            <span className={`arena-card-status ${arena.status === "open" ? "active-badge" : "inactive"}`}>
              {arena.arenaType.name}
            </span>
            <span className={`arena-card-status ${arena.status === "open" ? "active-badge" : "inactive"}`}>
              {arena.status}
            </span>
          </div>
        </div>
      </div>
      {isInfoHovered && (
        <div
          className="tooltip"
          style={{
            top: tooltipPosition.y + 15,
            left: tooltipPosition.x + 15,
          }}
        >
          <p><strong>Description:</strong> {arena.description}</p>
          <p><strong>Created by:</strong> @{arena.createdBy.username}</p>
        </div>
      )}
    </div>
  );
}
