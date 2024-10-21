import React from 'react';

function MessageBubble({ message }) {
  return (
    <div className={`mb-3 d-flex ${message.isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div
        className="p-2 rounded-3 shadow-light"
        style={{
          maxWidth: '60%',
          backgroundColor: message.isUser ? 'var(--color-dark)' : 'var(--color-secondary)',
          color: message.isUser ? 'var(--color-secondary)' : 'var(--color-dark)',
        }}
      >
        <strong className='text-white'>{message.sender}:</strong>
        <p className="mb-0">{message.text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
