import React, { useState } from "react";
import CustomModal from "../Modal/CustomModal";

function UserList({ participants, handleModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const openModal = (participant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#101010',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 255, 0, 0.2)',
        maxWidth: '400px',
        margin: '0 auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 255, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 255, 0, 0.2)';
      }}
    >
      <h4
        style={{
          color: '#00ff00',
          marginBottom: '16px',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        AI Figures
      </h4>
      <ul
        className="list-unstyled"
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          color: '#cfcfcf',
        }}
      >
        {participants.map((participant, index) => (
          <li
            key={index}
            className="mb-2 d-flex align-items-center"
            onClick={() => openModal(participant)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <img
              src={participant.image || 'assets/images/logo/logo.png'}
              alt={participant.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
                border: '2px solid #00ff00',
              }}
            />
            <span>{participant.name}</span>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <CustomModal
          onClose={() => setIsModalOpen(false)}
          profileData={selectedParticipant}
        />
      )}
    </div>
  );
}

export default UserList;
