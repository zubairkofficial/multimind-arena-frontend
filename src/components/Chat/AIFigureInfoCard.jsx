import React, { useState } from "react";
import "./../ArenaChat/arenachat.css"; // Import the CSS file for custom styles
import Logo from '../../../public/assets/images/logo/logo.png';

function AIFigureInfoCard({
  image,
  name,
  handleLeaveRoom,
  modelNames
}) {
  const [showModal, setShowModal] = useState(false);

  // Functions to handle modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Confirm leave action
  const confirmLeave = () => {
    handleLeaveRoom();

  };

  return (
    <div className="ai-figure-card shadow-sm">
      <div className="d-flex justify-content-between align-items-center p-4 ">
        <div className="d-flex align-items-center gap-3">
          <div className="ai-avatar-container">
            <img
              className="ai-avatar"
              src={image || Logo}
              alt={`${name} avatar`}
              onError={(e) => e.target.src = Logo}
            />
          </div>
          
          <div className="ai-info">
            <h3 className="ai-name mb-1">{name}</h3>
            <div className="model-badges">
              {modelNames.map((modelName, index) => (
                <span 
                  key={index}
                  className="model-badge"
                >
                  {modelName}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          className="leave-button"
          onClick={confirmLeave}
          title="Leave Chat"
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default AIFigureInfoCard;
