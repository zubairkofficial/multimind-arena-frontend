import React from "react";

function MessageBubble({ message }) {
  const isSender = message.sender === "You";

  // Get the current local system time
  const now = new Date();

  // Format the time as hours, minutes, and AM/PM
  const formattedTime = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: isSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
        backgroundColor: isSender ? "#222" : "#002200",
        color: "#fff",
        alignSelf: isSender ? "flex-end" : "flex-start",
      }}
    >
      {/* Sender Name (for AI messages only) */}
      {!isSender && (
        <div
          style={{
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "0.25rem",
          }}
        >
          {message.sender}
        </div>
      )}
      <p style={{ marginBottom: "0.5rem" }}>{message.content}</p>
      <div
        style={{
          fontSize: "0.8rem",
          color: "#aaa",
          textAlign: "right",
        }}
      >
        {formattedTime}
      </div>
    </div>
  );
}

export default MessageBubble;
