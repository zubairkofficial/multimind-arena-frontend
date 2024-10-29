import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, profileData }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-content">
          <div className="profile-image">
            <img
              src={profileData?.image || '/assets/images/default-profile.png'}
              alt={profileData?.name || 'Profile Image'}
              className="rounded-circle"
            />
          </div>
          <h2 className="profile-name">{profileData?.name || 'Profile'}</h2>
          <div className="profile-details">
            {Object.keys(profileData || {}).map((key) =>
              key !== 'image' && key !== 'name' ? (
                <p key={key} className="profile-detail">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {profileData[key]}
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
