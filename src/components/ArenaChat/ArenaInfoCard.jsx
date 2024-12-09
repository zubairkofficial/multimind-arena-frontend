import React, { useState } from "react";
import "./arenachat.css";
import Logo from "../../../public/assets/images/logo/logo.png";
import Meta from "../../../public/assets/meta-black-icon.svg";
import { ArenaType, ModelType } from '../../common';
import { FaUsers, FaClock, FaBrain, FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';
import { Info } from "lucide-react";
import styled from 'styled-components';

function ArenaInfoCard({
  image,
  arena,
  handleLeaveRoom,
  toggleParticipants,
  toggleUsers,
  setShowUsers,
  setShowInfoDetail,
  showInfoDetail,
  participantsCount = 0,
  expiryTime = null,
  arenaModel = []
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
const handleShowModal=()=>{
  toggleParticipants()
  setShowModal(!showModal)
}


  return (
    <div className="arena-info-container">
      <div className="arena-header">
        <div className="arena-main-info">
          <div className="arena-avatar">
            <img
              src={image || Logo}
              alt={arena?.name}
              onError={(e) => (e.target.src = Logo)}
            />
          </div>
          <div className="arena-details">
            <h3 className="arena-name">{arena?.name}</h3>
            <span className="arena-type">
              {arena?.isPrivate ? ArenaType.PRIVATE : ArenaType.PUBLIC}
            </span>
          </div>
        </div>

        <div className="arena-actions">
          <button
            className="action-button"
            onClick={() => {
              setShowDetails(!showDetails);
              setShowUsers(false);
              setShowModal(false);
            }}
            title="Toggle Details"
          >
             <InfoItem 
           
          >
            <IconWrapper>
              <Info size={16} />
            </IconWrapper>
          </InfoItem>
          </button>
          <button
            className="action-button"
            onClick={() => {
              setShowInfoDetail(!showInfoDetail);
              setShowUsers(false);
              setShowModal(false);
            }}
            title="Toggle Details"
          >
            {showInfoDetail ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          <button
            className="action-button"
            onClick={() => {
              toggleUsers();
              setShowDetails(false);
            }}
            title="Users"
          >
            <FaUsers />
          </button>

          <button
            className="action-button danger"
            onClick={() => {
              handleShowModal();
              setShowDetails(false);
            }}
            title="Leave"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {showInfoDetail && (
        <div className="details-panel">
          <div className="detail-item">
            <FaUsers className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Participants</span>
              <span className="detail-value">{participantsCount}</span>
            </div>
          </div>

          <div className="detail-item">
            <FaClock className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Expiry Time</span>
              <span className="detail-value">
                {expiryTime ? (
                  new Date(expiryTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                ) : (
                  <img
                    src={Meta}
                    className="meta-icon"
                    alt="∞"
                    onError={(e) => (e.target.src = Logo)}
                  />
                )}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <FaBrain className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Models</span>
              <div className="models-list">
                {arenaModel.length > 0 ? (
                  arenaModel?.map((item, index) => {
                    try {
                      const parsedItem = JSON.parse(item);
                      return (
                        <span key={index} className="model-badge">
                          {parsedItem.label}
                        </span>
                      );
                    } catch (error) {
                      return null;
                    }
                  })
                ) : (
                  <span className="model-badge">{ModelType?.GPT_4o_Mini}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showDetails && (
        <div className="details-panel">
          <div className="detail-item">
            <FaUsers className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Description</span>
              <span className="detail-value">{arena.description}</span>
            </div>
          </div>

       

        
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Leave Arena?</h5>
              <button className="close-button" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to leave this arena?</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-button danger"
                onClick={() => {
                  handleLeaveRoom();
                  setShowModal(false);
                }}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArenaInfoCard;


const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
`;

const IconWrapper = styled.div`
  color: #17df14;
  display: flex;
  align-items: center;
`;