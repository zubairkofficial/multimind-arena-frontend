import React from 'react';
import './customModal.css';
import Logo from "../../../public/assets/images/logo/logo.png";

import _ from 'lodash'
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
              src={figure?.image || Logo}
              alt={figure?.name}
              className="modal-image"
            />
          </div>
          <p className="description-text">{figure?.description}</p>
          <p className="figure-info">Type: {_.startCase(_.capitalize(figure?.type))}</p>

        </div>
        <div className="modal-footer text-center justify-content-center">
          <button className="btn-custom" onClick={onChatNow}>Chat Now</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
