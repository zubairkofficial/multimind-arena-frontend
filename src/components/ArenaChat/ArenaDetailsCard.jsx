import React from 'react';

function ArenaDetailsCard({ totalParticipants, expiryTime, aiStatus }) {
  return (
    <div className="arena-info-card p-3 mb-3">
      <h3 className="text-color-primary mb-4">Arena Info</h3>
      <div className="info-details-card">
        <p><i className="fas fa-users me-2 text-color-primary"></i>Total Participants: {totalParticipants}</p>
        <p><i className="fas fa-clock me-2 text-color-primary"></i>Expiry Time: {expiryTime}</p>
        <p><i className="fas fa-robot me-2 text-color-primary"></i>AI Assistant: {aiStatus}</p>
      </div>
    </div>
  );
}

export default ArenaDetailsCard;
