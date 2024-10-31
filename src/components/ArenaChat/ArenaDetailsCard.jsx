import React, { useState } from 'react';
import ArenaModal from './ArenaModal';

function ArenaDetailsCard({ aiDetails, totalParticipants, expiryTime, arena }) {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract AI figure names
  const aiNames = aiDetails?.map((detail) => detail.id).join(', ') || 'No AI Figures';

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
      <h3
        style={{
          color: '#00ff00',
          marginBottom: '12px',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Arena Info
      </h3>
      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#cfcfcf' }}>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <i className="fas fa-users" style={{ marginRight: '8px', color: '#00ff00' }}></i>
          Total Participants: {totalParticipants}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <i className="fas fa-clock" style={{ marginRight: '8px', color: '#00ff00' }}></i>
          Expiry Time: {expiryTime}
        </p>
     
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#00ff00',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#33ff33';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#00ff00';
        }}
      >
        View Details
      </button>
      {isModalOpen && <ArenaModal arena={arena} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default ArenaDetailsCard;
