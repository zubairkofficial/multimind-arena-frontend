import React, { useState } from "react";
import "./arenachat.css"; // Import the CSS file for custom styles
import Logo from "../../../public/assets/images/logo/logo.png";
import Meta from "../../../public/assets/meta-black-icon.svg";

function ArenaInfoCard({
  image,
  name,
  handleLeaveRoom,
  toggleParticipants,
  toggleUsers,
  setShowUsers,
  participantsCount = 0,
  expiryTime = null,
  arenaModel=[]
}) {
  console.log("arenaModel",arenaModel)
  const [showDetails, setShowDetails] = useState(false); // State for toggling details
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
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex gap-2 align-items-center">
          {/* Arena Name */}
          <img
            src={image || Logo}
            alt={Logo}
            className="img-fluid rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
              border: "2px solid #00ff00",
            }}
            onError={(e) => (e.target.src = Logo)} // Fallback to Logo if the image fails to load
          />
          <h3 className="text-color-primary mb-0 fs-5" style={{textransform:'capitalize'}}>{name}</h3>
        </div>

        {/* Actions Container */}
        <div className="d-flex align-items-center">
          {/* Toggle Details Icon Button */}
          <button
            className="btn p-2 me-3"
            onClick={() => {
              setShowDetails(!showDetails); // Toggle details visibility
              setShowUsers(false)
              setShowModal(false); // Close "Leave" modal if open
            }}
            title="Toggle Details"
          >
            <i
              className={`fas ${
                showDetails ? "fa-chevron-up" : "fa-chevron-down"
              } text-success fa-2xl `}
            ></i>
          </button>

          {/* Users Button */}
          <button
            className="btn p-2 me-3"
            onClick={() => {
              toggleUsers(); // Call the toggleUsers function
              setShowDetails(false); // Automatically close the details section
            }}
            title="Users"
          >
            <i className="fas fa-users text-success fa-xl"></i>
          </button>

          {/* Leave Button */}
          <button
            className="btn p-2 me-3"
            onClick={() => {
              handleShowModal(); // Show the modal
              setShowDetails(false); // Automatically close the details section
            }}
            title="Leave"
          >
            <i className="fas fa-sign-out-alt text-danger fa-2xl"></i>
          </button>
        </div>
      </div>

      {/* Details Section */}
      {showDetails && (
        <div
          className="details-section p-3 mt-2"
          style={{
            position: "absolute",
            top: "25%",
            right: "3%",
            backgroundColor: "#0a3d0c",
            color: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "0.8rem",
            lineHeight: "1.2",
            zIndex: 10,
          }}
        >
          <p style={{ marginBottom: "4px", fontSize: "1.1rem" }}>
            <i
              className="fas fa-users"
              style={{ marginRight: "8px", color: "#28a745" }}
            ></i>
            Total Participants: <span style={{fontWeight:'bold'}}>{participantsCount}</span>
          </p>
          <p  style={{ marginBottom: "4px", fontSize: "1.1rem" }}>
            <i
              className="fas fa-clock"
              style={{ marginRight: "8px", color: "#28a745" }}
            ></i>
            Expiry Time:{" "}
            {expiryTime ? (
              new Date(expiryTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })

            ) : (
              <img
                src={Meta}
                className="text-success"
                alt="not found"
                style={{
                  width: "18px",
                  height: "18px",
                  objectFit: "contain",
                }}
              />
            )}
          
          </p>
          <p style={{ marginBottom: "4px", fontSize: "1.1rem" }}>
          <i
  className="fas fa-brain"
  style={{
    marginRight: "8px",
    color: "#28a745",
    fontSize: "1.5rem",
  }}
></i>

            Models: <span style={{fontWeight:'bold'}}> {arenaModel?.map((item, index) => {
      try {
        const parsedItem = JSON.parse(item); // Parse the stringified JSON
        return (
          <span key={index} style={{ marginRight: "8px" }}>
            {parsedItem.label}
          </span>
        ); // Return the label
      } catch (error) {
        return null; // Handle any JSON parsing errors gracefully
      }
    })}</span>
          </p>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div
              className="modal-content"
              style={{ backgroundColor: "#101010", color: "white" }}
            >
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
