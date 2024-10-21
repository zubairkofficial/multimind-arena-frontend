import React from "react";

const AIFigureCard = ({ name, emoji, role }) => {
  return (
    <div className="ai-figure-card">
      <div className="card-content">
        <div className="emoji-display">{emoji}</div>
        <h4 className="ai-figure-name">{name}</h4>
        <p className="ai-figure-role">{role}</p>
      </div>
    </div>
  );
};

export default AIFigureCard;
