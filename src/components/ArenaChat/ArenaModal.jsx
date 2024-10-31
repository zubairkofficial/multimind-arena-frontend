import React from 'react';

function ArenaModal({ onClose, arena }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 50,
        left: 50,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background overlay
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
      }}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 255, 0, 0.5)',
          maxWidth: '400px',
          width: '90%',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#00ff00',
            fontSize: '16px',
            cursor: 'pointer',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          ✕
        </button>
        <div>Hello</div>
      </div>
    </div>
  );
}

export default ArenaModal;
