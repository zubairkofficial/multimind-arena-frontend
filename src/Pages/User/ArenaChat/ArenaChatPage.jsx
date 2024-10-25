import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MessageBubble from "./../../../components/ArenaChat/MessageBubble";
import ParticipantsCard from "./../../../components/ArenaChat/ParticipantsCard";
import ArenaInfoCard from "./../../../components/ArenaChat/ArenaInfoCard";
import { getSocket, initiateSocketConnection } from "./../../../app/socket";
import "./../../../components/ArenaChat/arenachat.css";

export default function ArenaChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [arena,setArena] = useState(location.state); // Retrieve the arena data passed through state

  const userId = useSelector((state) => state.user.user.id);
  console.log("User ID:", userId);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState(null); // State for notifications

  useEffect(() => {
    // Initialize socket connection if not already connected
    initiateSocketConnection();
    const socket = getSocket();

    if (arena?.id && socket) {
      // Join the room
      socket.emit("joinRoom", { arenaId: arena.id, userId });

      // Listen for incoming messages
      socket.on("receiveMessage", (data) => {
        if (data.senderId !== userId) {
          const receivedMessage = {
            sender: data.senderName,
            content: data.content,
            isUser: false,
            time: new Date().toLocaleTimeString(),
          };
          setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });
      socket.on("userRejoined", (data) => {
        console.log("User rejoined:", data);
        if (data.userId !== userId) {
          setNotification(`User ${data.userName || data.userId} has rejoined the room.`);
          setArena((prevArena) => ({ ...prevArena, ...data})); // Update arena state
          setTimeout(() => {
            setNotification(null); // Clear notification after 3 seconds
          }, 3000);
        }
      });
      
      // Listen for user joined event
      socket.on("userJoined", (data) => {
        console.log("User joined:", data);
        if (data.userId !== userId) {
          setNotification(`User ${data.userName || data.userId} has joined the room.`);
          setArena((prevArena) => ({ ...prevArena, ...data })); // Update arena state
          setTimeout(() => {
            setNotification(null); // Clear notification after 3 seconds
          }, 3000);
        }
      });
      // Listen for user left event
      socket.on("userLeft", (data) => {
        console.log("User left:", data);
        setNotification(`User ${data.userName || data.userId} has left the room.`);
        setTimeout(() => {
          setNotification(null); // Clear notification after 3 seconds
        }, 3000);
      });

      // Cleanup listeners when component unmounts
      return () => {
        socket.off("receiveMessage");
        socket.off("userJoined");
        socket.off("userLeft");
        socket.emit("leaveRoom", { arenaId: arena.id, userId });
      };
    }
  }, [arena?.id, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = getSocket();
    if (message.trim() && arena?.id && socket) {
      const newMessage = {
        content: message,
        userId,
        arenaId: arena.id,
      };
      socket.emit("sendMessage", newMessage);

      // Add the message to the local state immediately for responsiveness
      const localMessage = {
        sender: "You",
        content: message,
        isUser: true,
        time: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, localMessage]);
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("leaveRoom", { arenaId: arena.id, userId });
    }
    navigate("/dashboard");
  };

  return (
    <div className="d-flex h-100 bg-color-lessdark text-color-light">
      {/* Sidebar with Participants */}
      <ParticipantsCard
        participants={
          arena?.userArenas?.map((userArena) => userArena.user?.name) || ["Ahsan"]
        } // Extract user names from each userArena
        totalParticipants={arena?.userArenas?.length || 0}
        expiryTime={arena?.expiryTime}
        aiStatus="Active"
      />

      {/* Main Chat Area */}
      <div className="flex-grow-1 d-flex flex-column chat-message-area">
        {/* Arena Information (Header - Static) */}
        <ArenaInfoCard name={arena?.name || "Chat Arena"} handleLeaveRoom={handleLeaveRoom} />

        {/* Notification Area */}
        {notification && (
          <div className="notification-area text-center mt-3 p-4 bg-success text-dark">
            <span className="notification-text">{notification}</span>
          </div>
        )}

        {/* Chat Messages (Scrollable Section) */}
        <div
          className="flex-grow-1 p-3 overflow-auto chat-message-container"
          style={{ height: "50vh" }}
        >
          {chatMessages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>

        {/* Input Message & Leave Button (Static) */}
        <div className="p-3 border-top border-color-light">
          <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2 bg-color-black text-light border-success"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn-default btn-small me-2">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
