import React from "react";

function MessageBubble({ message }) {
  const isUser = message.userType === "user";
  const isSender = message.sender === "You";

  return (
    <div
      className={`mb-3 d-flex ${
        isSender ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        style={{
          maxWidth: "800px", // Maximum width of the bubble
          padding: "1rem",
          borderRadius: isSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
          backgroundColor: isSender ? "#222222" : "#003300", // Gray for user, green for received
          color: "#fff", // White text for both backgrounds
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
          wordWrap: "break-word", // Ensures long words will wrap inside the bubble
          overflowWrap: "break-word", // Ensures content breaks at appropriate points
        }}
      >
        <div
          style={{
            textAlign: isSender ? "right" : "left",
            marginBottom: "0.25rem",
            fontWeight: "bold",
            color: isSender ? "#fff" : "#fff", // Subtle text color for sender name
          }}
        >
          {!isSender && (
            <>
              <strong className="sender-name fs-5">
                {message.sender ?? "Default"}
              </strong>
            </>
          )}
        </div>
        <p className="mb-1 fs-5 " style={{ marginBottom: "0.5rem" }}>
          {message?.content ?? message?.message?.content}
        </p>
        <div
          style={{
            fontSize: "1rem", // Increased font size for time
            textAlign: isSender ? "right" : "left",
            color: "#aaa", // Subtle color for time display
          }}
        >
          {message.time}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
