import React, { useState } from "react";
import "./../ArenaChat/arenachat.css"; // Import the CSS file for custom styles

function AIFigureInfoCard({
  image,
  name,
  handleLeaveRoom,
  toggleParticipants,
  toggleUsers,
}) {
  const [showModal, setShowModal] = useState(false);

  // Functions to handle modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Confirm leave action
  const confirmLeave = () => {
    handleLeaveRoom();
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-color-light">
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
            onClick={handleShowModal}
            title="Leave"
          >
            <i className="fas fa-sign-out-alt text-danger fa-2xl"></i>
          </button>
          <button className="btn p-2 me-3" onClick={toggleUsers} title="Users">
            <i className="fas fa-users text-success fa-xl"></i>
          </button>

          {/* Three Dot Menu */}
          <div className="dropdown">
            <button
              className="btn text-white dropdown-toggle p-2"
              onClick={toggleParticipants}
            >
              <i className="fas fa-ellipsis-v fa-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Leave</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to leave the chat?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmLeave}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIFigureInfoCard;
