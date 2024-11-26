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
import { useGetUserByIdQuery } from "../../../features/api/userApi";
import Logo from '../../../../public/assets/images/logo/logo.png';
export default function ArenaChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [arena, setArena] = useState();
  const userId = useSelector((state) => state.user.user.id);
  const { data: arenaData, refetch } = useGetAllArenasQuery();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chatContainerRef = useRef(null);
  const { data:userData,refetch:userRefetch } = useGetUserByIdQuery(userId);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Helper function to generate a unique localStorage key for each arena
  const getArenaMessageKey = (arenaId) => `arenaMessages_${arenaId}`;
console.log("arena",arena)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    initiateSocketConnection();
    const socket = getSocket();

    if (arena?.id && socket) {
      // Load saved messages for the current arena from localStorage
      const savedMessages = JSON.parse(localStorage.getItem(getArenaMessageKey(arena.id))) || [];
      setMessages(savedMessages);

      socket.emit("joinRoom", { arenaId: arena.id, userId });

      socket.on("receiveMessage", (data) => {
        if (data.message.senderId !== userId) {
          const newMessage = {
            sender: data.user.name,
            message: data.message,
            user: data.user,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem(getArenaMessageKey(arena.id), JSON.stringify(updatedMessages));
            return updatedMessages;
          });
        }
      });

      socket.on("userRejoined", (data) => {
        console.log("rejoined", data);
        refetch();
        const latestUser = data.joinArena?.userArenas?.at(-1)?.user;

        if (latestUser && latestUser.id !== userId) {
          setNotification(`User ${latestUser.name || latestUser.id} has rejoined.`);
          setArena({ ...data.joinArena });
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userJoined", (data) => {
        console.log("joined", data);
        refetch();
        const latestUser = data.joinArena?.userArenas?.at(-1)?.user;

        if (latestUser && latestUser.id !== userId) {
          setNotification(`User ${latestUser.name || latestUser.id} has joined.`);
          setArena({ ...data.joinArena });
          setTimeout(() => setNotification(null), 3000);
        }
      });

      socket.on("userLeft", (data) => {
        console.log("left", data);
        refetch();
        const latestUser = data.leftArena?.userArenas?.at(-1)?.user;

        if (latestUser && latestUser.id !== userId) {
          setNotification(`User ${latestUser.name || latestUser.id} has left.`);
          setArena({ ...data.leftArena });
          setTimeout(() => setNotification(null), 3000);
        }
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setArena(location?.state);
  }, [location?.state]);

  const handleModal = () => setIsModalOpen(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = getSocket();
    if (message.trim() && arena?.id && socket) {
      const newMessage = {
        sender: "You",
        content: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      socket.emit("sendMessage", { content: message, userId, arenaId: arena.id });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(getArenaMessageKey(arena.id), JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      userRefetch()

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

  const sortedMessages = messages
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .map((message) => ({
      ...message,
      formattedTime: new Date(message.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  return (
   <div
  className="arena-chat-page"
  style={{
    fontSize: "calc(100% - 5px)", // Reduces font size globally by 5px
    lineHeight: "1.2", // Optional: Adjusts line spacing for smaller fonts
  }}
>
  {/* Rest of your JSX structure */}
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
        fontSize: "1rem", // Adjusted font size
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
    ></div>

    <div
      className={`flex-grow-1 d-flex flex-column chat-message-area ${
        showParticipants && !isMobile ? "" : "full-width"
      } ${showUsers ? "slideIn" : "slideOut"}`}
    >
      <ArenaInfoCard
        image={arena?.image}
        name={arena?.name}
        handleLeaveRoom={handleLeaveRoom}
        toggleParticipants={toggleParticipants}
        toggleUsers={toggleUsers}
        setShowUsers={setShowUsers}
        participantsCount={arena?.userArenas?.length || 0}
        expiryTime={arena?.expiryTime}
        arenaModel={arena?.arenaModel}
      />

      {notification && (
        <div
          className="notification-area text-center mt-3 p-4 bg-success text-light"
          style={{ fontSize: "0.8rem" }} // Reduced font size
        >
          <span className="notification-text">{notification}</span>
        </div>
      )}

      <div
        ref={chatContainerRef}
        className="flex-grow-1 pt-4 px-4 overflow-auto chat-message-container"
      >
        {sortedMessages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex align-items-center ${
              msg.sender === "You" ? "justify-content-end" : ""
            }`}
            style={{
              marginBottom: "1rem",
              fontSize: "0.85rem", // Reduced font size for messages
            }}
          >
            {msg.sender !== "You" && (
              <img
                src={msg?.user?.image || Logo}
                alt={msg?.user?.name}
                className="message-image"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "0.5rem",
                }}
                onError={(e) => (e.target.src = Logo)}
              />
            )}
            <MessageBubble message={msg} />
            {msg.sender === "You" && (
              <img
                src={userData?.image}
                alt="You"
                className="message-image"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginLeft: "0.5rem",
                }}
                onError={(e) => (e.target.src = Logo)}
              />
            )}
          </div>
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
            style={{
              borderRadius: "50px",
              fontSize: "1.2rem", // Reduced font size for input
            }}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-large rounded-circle position-absolute end-0 top-50 translate-middle-y me-5 btn-success text-white shadow"
            style={{ fontSize: "0.8rem" }}
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
          fontSize: "0.9rem", // Reduced font size for users section
        }}
      >
        <UserListCard
          users={arena?.userArenas?.map((userArena) => userArena.user) || []}
          ai={
            arena?.arenaAIFigures?.map((userArena) => userArena.aiFigure) || [
              "Ahsan",
            ]
          }
        />
      </div>
    )}
  </div>
</div>

  );
}