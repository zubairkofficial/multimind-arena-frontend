import React, { useState } from "react";
import MessageBubble from "./../../../components/ArenaChat/MessageBubble";
import ParticipantsCard from "./../../../components/ArenaChat/ParticipantsCard";
import ArenaInfoCard from "./../../../components/ArenaChat/ArenaInfoCard";
import './../../../components/ArenaChat/arenachat.css'
export default function ArenaChatPage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "John Doe",
      text: "Hey everyone! Excited to discuss our new eco-friendly project.",
      isUser: false,
    },
    {
      sender: "Jane Smith",
      text: "Great to be here! I've got some ideas for sustainable materials we could use.",
      isUser: false,
    },
    {
      sender: "AI Assistant",
      text: "Hello! I've analyzed recent trends in eco-friendly technologies. Would you like a summary?",
      isUser: false,
    },
    {
      sender: "Bob Brown",
      text: "That would be great, AI! Please share the summary with us.",
      isUser: false,
    },
    {
      sender: "You",
      text: "Sounds interesting! I'm looking forward to the summary.",
      isUser: true,
    },
    {
      sender: "AI Assistant",
      text: "Hello! I've analyzed recent trends in eco-friendly technologies. Would you like a summary?",
      isUser: false,
    },
    {
      sender: "Bob Brown",
      text: "That would be great, AI! Please share the summary with us.",
      isUser: false,
    },
    {
      sender: "You",
      text: "Sounds interesting! I'm looking forward to the summary.",
      isUser: true,
    },
    
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "You", text: message, isUser: true },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="d-flex h-100 bg-color-lessdark text-color-light">
      {/* Sidebar with Participants */}
      <ParticipantsCard
        participants={[
          "John Doe",
          "Jane Smith",
          "Bob Brown",
          "AI Assistant",
          "You",
        ]}
        totalParticipants={5}
        expiryTime="2h 30m"
        aiStatus="Active"
      />

      {/* Main Chat Area */}
      <div className="flex-grow-1 d-flex flex-column chat-message-area">
        {/* Arena Information */}
        <ArenaInfoCard name="Eco Tech Innovators" />

        {/* Chat Messages */}
        <div className="flex-grow-1 p-3 overflow-auto">
          {chatMessages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>

        {/* Input Message */}
        <div className="p-3 border-top border-color-light">
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              className="form-control me-2 bg-color-black text-light border-success"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn-default btn-small">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
