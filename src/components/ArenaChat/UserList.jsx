import React from 'react';

function UserList({ participants }) {
  return (
    <div className="user-list-card p-3">
      <h4 className="text-color-primary mb-3">Members</h4>
      {/* Scrollable participant list */}
      <ul className="list-unstyled" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {participants.map((participant, index) => (
          <li key={index} className="mb-2">
            <i className={`fas ${participant === 'AI Assistant' ? 'fa-robot' : 'fa-user'} me-2 text-color-primary`}></i>
            {participant}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
