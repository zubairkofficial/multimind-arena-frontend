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
        maxWidth: "800px",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        borderRadius: isSender ? "20px 20px 0 20px" : "20px 20px 20px 0",
        backgroundColor: isSender ? "#101010" : "#002200",
        color: "#fff",
        alignSelf: isSender ? "flex-end" : "flex-start",
      }}
    >
      {/* Sender Name (for AI messages only) */}
      {!isSender && (
        <>  <strong className="sender-name ">{message.sender ?? "Default"}</strong>        
           {/* <strong className="sender-name  bg-success text-light  rounded p-2">{message?.message?.arenas?.userArenas[0]?.role ?? "Default"}</strong> */}
           </> 
        
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
