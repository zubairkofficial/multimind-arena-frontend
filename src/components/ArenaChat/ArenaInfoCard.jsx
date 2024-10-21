import React from 'react';

function ArenaInfoCard({ name }) {
  return (
    <div className="p-3 border-bottom border-color-light">
      <h2 className="text-color-primary">
        <i className="fas fa-comments me-2"></i>{name}
      </h2>
    </div>
  );
}

export default ArenaInfoCard;
