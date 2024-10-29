import React from 'react';
import CustomModal from '../Modal/CustomModal';
function UserList({ participants, handleModal }) {
  return (
    <div className="user-list-card p-3">
      <h4 className="text-color-primary mb-3">AI Figures</h4>
      {/* Scrollable participant list */}
      <ul className="list-unstyled" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {participants.map((participant, index) => (
          <li key={index} className="mb-2" onClick={handleModal}>
            <i className={`fas fa-robot me-2 text-color-primary`}></i>
            {participant}
          </li>
        ))}
      </ul>
      <CustomModal 
      
        onClose={() => setIsModalOpen(false)}
        profileData={participants} />
    </div>
  );
}

export default UserList;
