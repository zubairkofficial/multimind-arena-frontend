import React, { useState } from "react";
import "./arenachat.css"; // Import the CSS file for custom styles

function ArenaInfoCard({
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
      <div className="d-flex justify-content-between align-items-center p-3 ">
        <div className="d-flex gap-2 align-items-center">
          {/* Arena Name */}{" "}
          <img
            src={image}
            alt=""
            className="img-fluid rounded-circle" // Bootstrap classes for responsiveness and circular shape
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
              border: "2px solid #00ff00",
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
      <div className="modal-content" style={{ backgroundColor: "#101010", color: "white" }}>
        <div className="modal-header" style={{ border: "none" }}>
          <h5 className="modal-title">Confirm Leave</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={handleCloseModal}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to leave the arena?</p>
        </div>
        <div className="modal-footer" style={{ border: "none" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={confirmLeave}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
            }}
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

export default ArenaInfoCard;
