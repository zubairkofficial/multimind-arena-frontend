import React from "react";
import "./../../../components/Modal/CustomModal.css";

const CustomModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container small">
        <div className="modal-header-small">
          <div className="text-center">
            <div className="spinner-border text-light mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>Joining the arena...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
