import React, { useState } from "react";
import "./../ArenaChat/arenachat.css"; // Import the CSS file for custom styles

function AIFigureInfoCard({
  image,
  name,
  handleLeaveRoom,
 
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
    <div>
      <div className="d-flex justify-content-between align-items-center p-3  ">
        <div className="d-flex gap-3">
          {/* Arena Name */}{" "}
          <img
            src={image}
            alt=""
            style={{
              borderRadius: "50px",
              width: "50px",
              backgroundColor: "white",
              border: "3px solid #00ff00",
            }}
          />
          <h3 className="text-color-primary mb-0">{name}</h3>
        </div>
        {/* Actions Container */}
        <div className="d-flex align-items-center">
          {/* Leave Icon Button */}
          <button
            className="btn p-2 me-3"
            onClick={confirmLeave}
            title="Leave"
          >
            <i className="fas fa-sign-out-alt text-danger fa-2xl"></i>
          </button>
        

          {/* Three Dot Menu */}
         
        </div>
      </div>

      {/* Confirmation Modal */}
     
    </div>
  );
}

export default AIFigureInfoCard;
