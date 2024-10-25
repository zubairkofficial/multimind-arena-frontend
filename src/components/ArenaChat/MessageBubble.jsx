import React from 'react';

function MessageBubble({ message }) {
  const isUser = message.userType === "user";
  const isSender = message.sender === "You";

  return (
    <div className={`mb-3 d-flex ${isSender ? 'justify-content-end' : 'justify-content-start'}`}>
      <div
        className={`p-3 shadow ${isSender ? 'bubble-user' : 'bubble-received'}`}
        style={{
          maxWidth: '50%',
          borderRadius: isSender ? '20px 20px 0 20px' : '20px 20px 20px 0',
        }}
      >
        <div className={`sender-info ${isSender ? 'text-right' : 'text-left'} mb-1`}>
          {!isSender && <strong className='sender-name'>{message.sender}</strong>}
        </div>
        <p className="mb-1 message-content">{message.content}</p>
        <div className="text-muted message-time" style={{ fontSize: '0.8rem', textAlign: isSender ? 'right' : 'left' }}>
          {message.time}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
