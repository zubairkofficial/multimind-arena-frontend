import React from 'react';
import './customModal.css';

const CustomModal = ({ show, onClose, figure, onChatNow }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container no-shadow">
        <div className="modal-header-small d-flex justify-content-between">
          <h4>{figure?.name}</h4>
          <div className='d-flex justify-content-end'>
          <button onClick={onClose} className="close-button">✖</button>
          </div>
        </div>
        <div className="modal-body">
          <div className="image-container">
            <img
              src={figure?.image || "/assets/images/logo/logo.png"}
              alt={figure?.name}
              className="modal-image"
            />
          </div>
          <p className="description-text">{figure?.description}</p>
          <p className="figure-info">Type: {figure?.type}</p>

        </div>
        <div className="modal-footer">
          <button className="btn-custom" onClick={onChatNow}>Chat Now</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
