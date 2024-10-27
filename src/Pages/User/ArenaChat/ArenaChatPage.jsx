import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MessageBubble from "./../../../components/ArenaChat/MessageBubble";
import ParticipantsCard from "./../../../components/ArenaChat/ParticipantsCard";
import ArenaInfoCard from "./../../../components/ArenaChat/ArenaInfoCard";
import UserListCard from "./UserListCard";
import { getSocket, initiateSocketConnection } from "./../../../app/socket";
import "./../../../components/ArenaChat/arenachat.css";

export default function ArenaChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [arena, setArena] = useState(location.state);
  const userId = useSelector((state) => state.user.user.id);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const chatContainerRef = useRef(null);
  console.log("Arena:", arena);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    initiateSocketConnection();
    const socket = getSocket();

    if (arena?.id && socket) {
      socket.emit("joinRoom", { arenaId: arena.id, userId });

      socket.on("receiveMessage", (data) => {
        if (data.senderId !== userId) {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: data.senderName,
              content: data.content,
              isUser: false,
              time: new Date().toLocaleTimeString(),
            },
          ]);
        }
      });

      socket.on("userRejoined", (data) => {
        if (data.userId !== userId) {
          setNotification(`User ${data.userName || data.userId} has rejoined.`);
          setArena((prevArena) => ({ ...prevArena, ...data }));
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userJoined", (data) => {
        if (data.userId !== userId) {
          setNotification(`User ${data.userName || data.userId} has joined.`);
          setArena((prevArena) => ({ ...prevArena, ...data }));
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userLeft", (data) => {
        setNotification(`User ${data.userName || data.userId} has left.`);
        setTimeout(() => setNotification(null), 3000);
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("userJoined");
        socket.off("userLeft");
        socket.emit("leaveRoom", { arenaId: arena.id, userId });
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [arena?.id, userId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = getSocket();
    if (message.trim() && arena?.id && socket) {
      socket.emit("sendMessage", {
        content: message,
        userId,
        arenaId: arena.id,
      });
      setChatMessages([
        ...chatMessages,
        {
          sender: "You",
          content: message,
          isUser: true,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  const handleLeaveRoom = () => {
    getSocket().emit("leaveRoom", { arenaId: arena.id, userId });
    navigate("/dashboard");
  };

  const toggleParticipants = () => setShowParticipants(!showParticipants);

  const toggleUsers = () => setShowUsers(!showUsers);

  return (
    <div className="d-flex h-100 bg-transparent text-color-light">
      <button
        className="btn-default btn-small"
        onClick={toggleParticipants}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: showParticipants ? "#45db34" : "#1c1c1c",
          color: "#f8f9fa",
          border: "none",
          padding: "0.5rem",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.2rem",
          transition: "transform 0.3s ease, background-color 0.3s ease",
          transform: showParticipants ? "scale(1)" : "scale(1.1)",
        }}
      >
        <i className={`fas ${showParticipants ? "fa-users" : "fa-times"}`} />
      </button>

      <div
        className={showParticipants ? "slide-in-left" : "slide-out-left"}
        style={{
          width: showParticipants ? (isMobile ? "50%" : "420px") : "0",
          opacity: showParticipants ? 1 : 0,
          overflow: "hidden",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "100px" : "0",
          zIndex: isMobile ? 10 : "auto",
        }}
      >
        {showParticipants && (
          <ParticipantsCard
            participants={
              arena?.arenaAIFigures?.map(
                (userArena) => userArena.aiFigure?.name
              ) || ["Ahsan"]
            }
            totalParticipants={arena?.userArenas?.length || 0}
            expiryTime={arena?.expiryTime}
            aiStatus="Active"
          />
        )}
      </div>

      <div
        className={`flex-grow-1 d-flex flex-column chat-message-area ${
          showParticipants && !isMobile ? "" : "full-width"
        }`}
      >
        <ArenaInfoCard
          name={arena?.name || "Chat Arena"}
          handleLeaveRoom={handleLeaveRoom}
          toggleParticipants={toggleParticipants}
          toggleUsers={toggleUsers}
        />

        {notification && (
          <div className="notification-area text-center mt-3 p-4 bg-success text-dark">
            <span className="notification-text">{notification}</span>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className={`flex-grow-1 pt-4 px-4 overflow-auto chat-message-container ${
            chatMessages.length ? "slideIn" : "fade-out"
          }`}
        >
          {chatMessages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>

        <div className="p-1 border-color-light chat-input-container">
          <form
            onSubmit={handleSubmit}
            className="mt-5 d-flex align-items-center w-100 position-relative bg-transparent"
          >
            <input
              type="text"
              className="form-control p-3 bg-color-black text-light pr-5"
              style={{ borderRadius: "50px" }}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-large rounded-circle position-absolute end-0 top-50 translate-middle-y me-5 btn-success text-white shadow"
            >
              <i className="fas fa-send"></i>
            </button>
          </form>
        </div>
      </div>

      {showUsers && (
        <div
          className={showUsers ? "slide-in-right" : "slide-out-right"}
          style={{
            width: "400px",
            backgroundColor: "#101010",
            color: "#fff",
            padding: "1rem",
            overflow: "auto",
          }}
        >
          <UserListCard
            users={
              arena?.userArenas?.map((userArena) => userArena.user?.name) || []
            }
          />
        </div>
      )}
    </div>
  );
}
