import React from 'react';
import ArenaDetailsCard from './ArenaDetailsCard';
import UserList from './UserList';

function ParticipantsCard({ handleModal, aiDetails, participants, totalParticipants, expiryTime, aiStatus }) {
  return (
    <div className="participants-card text-light p-3" style={{ width: '250px' }}>
      {/* Arena Info Section */}
      <ArenaDetailsCard 
        aiDetails={aiDetails}
        totalParticipants={totalParticipants}
        expiryTime={expiryTime ? new Date(expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
        aiStatus={aiStatus}
      />

      {/* User List Section */}
      <UserList participants={participants} handleModal={handleModal} />
    </div>
  );
}

export default ParticipantsCard;
