import React, { useState } from "react";
import { Clock, Info, Users } from "lucide-react";
import "./ArenaCard.css";

export default function ArenaCard({ arena, onJoin }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

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

  return (
    <div className="arena-card">
      <div className="arena-card-content">
        <div className="arena-image-wrapper mb-4">
          <img
            alt={arena.na}
            className="arena-image"
            src="/assets/images/logo/3(1).png"
          />
        </div>
        <h3 className="arena-name text-uppercase mb-2">{arena.name}</h3>
        <div className="arena-info mb-2 ">
          <div className="d-flex align-items-center me-3">
            <Users className="me-2" size={18} />
            <span>
              {arena.userArenas.length}/{arena.maxParticipants}
            </span>
          </div>
          <div className="d-flex align-items-center me-4">
            <Clock className="me-2" size={18} />
            <span>{formatTime(arena.expiryTime)}</span>
          </div>
          {/* Info Icon with Hover Effect */}
          <div
            className="d-flex  align-items-center position-relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Info className="me-2" size={18} />
            {/* Tooltip content */}
            {isHovered && (
              <div className="hover-info-box position-absolute">
                <p>{arena.description}</p>
                <p>Created by: @{arena.createdBy.username}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="arena-footer">
          <button className="btn custom-btn" onClick={onJoin}>
            Join Arena
          </button>
          <span
            className={`arena-status-badge ${
              arena.status === "open" ? "bg-success" : "bg-danger"
            }`}
          >
            {arena.status}
          </span>
        </div>
      </div>
    </div>
  );
}
