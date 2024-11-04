import React from "react";

function MessageBubble({ message }) {
  console.log("-----------", message);
  const isUser = message.userType === "user";
  const isSender = message.sender === "You";

  // Safely parse time to show only hours and minutes or show "Invalid Time"
  const formattedTime = !isNaN(Date.parse(message.time))
    ? new Date(message.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Invalid Time";

  console.log("msg", message);

  return (
    <div
      className={`mb-3 d-flex ${
        isSender ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        style={{
          maxWidth: "800px",
          padding: "1rem",

          borderRadius: isSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
          backgroundColor: isSender ? "#101010" : "#003300", // Gray for user, green for received
          color: "#fff", // White text for both backgrounds
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
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
         <>  <strong className="sender-name">{message.sender ?? "Default"}</strong>           <strong className="sender-name bg-light text-dark  rounded p-2">{message.user.role ?? "Default"}</strong></> 
          )}
        </div>
        <p className="mb-1" style={{ marginBottom: "0.5rem" }}>
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
