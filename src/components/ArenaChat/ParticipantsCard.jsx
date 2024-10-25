import React from 'react';
import ArenaDetailsCard from './ArenaDetailsCard';
import UserList from './UserList';

function ParticipantsCard({ aiDetails, participants, totalParticipants, expiryTime, aiStatus }) {
  return (
    <div className="text-light p-3" style={{ width: '250px' }}>
      {/* Arena Info Section */}
      <ArenaDetailsCard 
        aiDetails ={aiDetails}
        totalParticipants={totalParticipants}
        expiryTime={new Date(expiryTime).toLocaleTimeString()} // Format expiry time
        aiStatus={aiStatus}
      />

      {/* User List Section */}
      <UserList participants={participants} />
    </div>
  );
}

export default ParticipantsCard;
