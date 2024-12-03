import React from "react";
import './ConfirmationModal.css'; // Ensure your CSS file is named correctly

const ConfirmationModal = ({title,body,show, onClose, onConfirm,isDeleteArena=false }) => {
  // Only render the modal if show is true
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container no-shadow" onClick={e => e.stopPropagation()}>
        <div className="modal-header-small">
          <h4>{title}</h4>
          <button onClick={onClose} className="close-button">✖</button>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-custom" onClick={onClose}>Cancel</button>
          <button className="btn-custom" onClick={onConfirm}>{isDeleteArena?"Deleting...": "Delete"}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
