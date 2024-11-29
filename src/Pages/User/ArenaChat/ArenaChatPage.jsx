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
import styled from 'styled-components';

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
    <ChatContainer>
      <ChatLayout>
        {/* Participants Toggle Button */}
        {/* <ToggleButton 
          onClick={toggleParticipants} 
          isActive={showParticipants}
          position="left"
        > */}
          {/* <i className={`fas ${showParticipants ? "fa-times" : "fa-users"}`} /> */}
        {/* </ToggleButton> */}

        {/* Participants Panel */}
        {/* <ParticipantsPanel 
          isVisible={showParticipants} 
          isMobile={isMobile}
        >
          <ParticipantsCard
            participants={arena?.userArenas || []}
            arenaId={arena?.id}
          />
        </ParticipantsPanel> */}

        {/* Main Chat Area */}
        <ChatMainArea 
          showParticipants={showParticipants} 
          isMobile={isMobile}
          showUsers={showUsers}
        >
          {/* Arena Info Header */}
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

          {/* Notification Area */}
          {notification && (
            <NotificationBar>
              {notification}
            </NotificationBar>
          )}

          {/* Messages Container */}
          <MessagesContainer ref={chatContainerRef}>
            {sortedMessages.map((msg, index) => (
              <MessageWrapper 
                key={index}
                isOwnMessage={msg.sender === "You"}
              >
                {msg.sender !== "You" && (
                  <UserAvatar
                    src={msg?.user?.image || Logo}
                    alt={msg?.user?.name}
                    onError={(e) => (e.target.src = Logo)}
                  />
                )}
                
                <MessageBubble message={msg} />
                
                {msg.sender === "You" && (
                  <UserAvatar
                    src={userData?.image}
                    alt="You"
                    onError={(e) => (e.target.src = Logo)}
                  />
                )}
              </MessageWrapper>
            ))}
          </MessagesContainer>

          {/* Chat Input Area */}
          <ChatInputContainer>
            <ChatForm onSubmit={handleSubmit}>
              <ChatInput
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <SendButton type="submit">
                <i className="fas fa-paper-plane" />
              </SendButton>
            </ChatForm>
          </ChatInputContainer>
        </ChatMainArea>

        {/* Users Panel */}
        <UsersPanel isVisible={showUsers}>
          <UserListCard
            users={arena?.userArenas?.map((userArena) => userArena.user) || []}
            ai={arena?.arenaAIFigures?.map((userArena) => userArena.aiFigure) || []}
          />
        </UsersPanel>
      </ChatLayout>
    </ChatContainer>
  );
}

// Styled Components
const ChatContainer = styled.div`
  height: 100vh;
  background: linear-gradient(145deg, #101010, #0a3d0c20);
  color: #ffffff;
`;

const ChatLayout = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  ${props => props.position}: 1rem;
  background: ${props => props.isActive ? '#17df14' : 'rgba(10, 61, 12, 0.8)'};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
    background: #17df14;
  }
`;

const ParticipantsPanel = styled.div`
  width: ${props => props.isVisible ? (props.isMobile ? '80%' : '300px') : '0'};
  background: rgba(16, 16, 16, 0.95);
  border-right: 1px solid #17df14;
  transition: all 0.3s ease;
  overflow: hidden;
  position: ${props => props.isMobile ? 'absolute' : 'relative'};
  height: 100%;
  z-index: 90;
`;

const ChatMainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(16, 16, 16, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const NotificationBar = styled.div`
  background: rgba(23, 223, 20, 0.1);
  color: #17df14;
  padding: 0.8rem;
  text-align: center;
  border-radius: 8px;
  margin: 1rem;
  animation: fadeIn 0.3s ease;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #17df14;
    border-radius: 3px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isOwnMessage ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #17df14;
  object-fit: cover;
`;

const ChatInputContainer = styled.div`
  padding: 1rem;
  background: rgba(16, 16, 16, 0.95);
  border-top: 1px solid rgba(23, 223, 20, 0.1);
`;

const ChatForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 25px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(23, 223, 20, 0.3);
  }
`;

const UsersPanel = styled.div`
  width: ${props => props.isVisible ? '300px' : '0'};
  background: rgba(16, 16, 16, 0.95);
  border-left: 1px solid #17df14;
  transition: all 0.3s ease;
  overflow: hidden;
`;