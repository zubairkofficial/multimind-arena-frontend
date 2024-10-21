import React from "react";
import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages }) => {
  return (
    <div className="chat-box-list" id="chatContainer">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessageList;
