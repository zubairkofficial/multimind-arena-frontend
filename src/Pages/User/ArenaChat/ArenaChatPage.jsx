import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MessageBubble from "./../../../components/ArenaChat/MessageBubble";
import ParticipantsCard from "./../../../components/ArenaChat/ParticipantsCard";
import ArenaInfoCard from "./../../../components/ArenaChat/ArenaInfoCard";
import UserListCard from "./UserListCard";
import { getSocket, initiateSocketConnection } from "./../../../app/socket";
import "./../../../components/ArenaChat/arenachat.css";
import { useGetAllArenasQuery } from "../../../features/api/arenaApi";

export default function ArenaChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [arena, setArena] = useState();
  const userId = useSelector((state) => state.user.user.id);
  const { data: arenaData, refetch } = useGetAllArenasQuery();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const chatContainerRef = useRef(null);
console.log("chatMessages",chatMessages)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    initiateSocketConnection();
    const socket = getSocket();

    if (arena?.id && socket) {
      socket.emit("joinRoom", { arenaId: arena.id, userId });

      socket.on("receiveMessage", (data) => {
        console.log("Receive", data);
        console.log("ReceiveM", data.user);
        if (data.message.senderId !== userId) {
          console.log("AGAYA");
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: data.user.name,
              message: data.message,
              user: data.user,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }
      });
      socket.on("userRejoined", (data) => {
        refetch();
        if (data.userId !== userId) {
          setNotification(
            `User ${data.name || data.userId} has rejoined.`
          );
          setArena({ ...data.joinArena });
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userJoined", (data) => {
        refetch();
        console.log("Join data", data);
        if (data.userId !== userId) {
          setNotification(
            `User ${data.name || data.userId} has joined.`
          );
          setArena({ ...data.joinArena });
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userLeft", (data) => {
        refetch();
        setNotification(
          `User ${data.name || data.userId} has left.`
        );
        setArena({ ...data.leftArena });
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
  }, [userId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
  useEffect(() => {
    setArena(location?.state); // Update arena state when location changes  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = getSocket();
    if (message.trim() && arena?.id && socket) {
      console.log("Sending Message:", {
        content: message,
        userId,
        arenaId: arena.id,
      }); // Log the outgoing message

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
    refetch();
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
          width: showParticipants ? (isMobile ? "50%" : "250px") : "0",
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
              arena?.arenaAIFigures?.map((userArena) => userArena.aiFigure) || [
                "Ahsan",
              ]
            }
            handleModal={handleModal}
            totalParticipants={arena?.userArenas?.length || 0}
            expiryTime={arena?.expiryTime}
            aiStatus="Active"
          />
        )}
      </div>

      <div
        className={`flex-grow-1 d-flex flex-column chat-message-area ${
          showParticipants && !isMobile ? "" : "full-width"
        } ${showUsers ? "slideIn" : "slideOut"}`}
      >
        <ArenaInfoCard
          name={arena?.name || "Chat Arena"}
          handleLeaveRoom={handleLeaveRoom}
          toggleParticipants={toggleParticipants}
          toggleUsers={toggleUsers}
          image={arena?.image || "assets/images/logo/logo.png"}
        />

        {notification && (
          <div className="notification-area text-center mt-3 p-4 bg-success text-dark">
            <span className="notification-text">{notification}</span>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className={`flex-grow-1 pt-4 px-4 overflow-auto chat-message-container ${
            showUsers ? "slideOut" : "slideIn"
          }`}
        >
          {chatMessages && chatMessages.map((msg, index) => {
            return (
              <MessageBubble
                message={msg}
                // user={msg?.user}
              />
            );
          })}
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
              placeholder="Message..."
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
            width: "300px",
            backgroundColor: "#101010",
            color: "#fff",
            padding: "1rem",
            overflow: "auto",
          }}
        >
          <UserListCard
            users={arena?.userArenas?.map((userArena) => userArena.user) || []}
          />
        </div>
      )}
    </div>
  );
}
