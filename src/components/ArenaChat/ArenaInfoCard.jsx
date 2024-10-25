import React, { useState } from 'react';
import './arenachat.css'; // Import the CSS file for custom styles

function ArenaInfoCard({ name, handleLeaveRoom }) {
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
        {/* Arena Name */}
        <h3 className="text-color-primary mb-0">
          <i className="fas fa-comments fa-lg me-3"></i>
          {name}
        </h3>

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

          {/* Three Dot Menu */}
          <div className="dropdown">
            <button
              className="btn text-white dropdown-toggle p-2"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v fa-lg"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
              <li><a className="dropdown-item" href="#">Option 2</a></li>
              <li><a className="dropdown-item" href="#">Option 3</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
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
                <p>Are you sure you want to leave the arena?</p>
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

export default ArenaInfoCard;
