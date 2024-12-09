import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAIFigureByIdQuery } from "../../../features/api/aiFigureApi"; // Import the query hook
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from '../../../features/api/userApi'; // Import the query hook
import styled from "styled-components";

import MessageBubble from "./MessageBubble";
import AIFigureInfoCard from "./../../../components/Chat/AIFigureInfoCard";
import Helpers from "../../../Config/Helpers";
import Logo from '../../../../public/assets/images/logo/logo.png';
import { ModelType } from "../../../common";

const Header = styled.div`
  background: linear-gradient(135deg, #0a3d0c 0%, #17df14 100%);
  padding: 1rem 1.5rem;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AvatarContainer = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    background: #4CAF50;
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

const HeaderAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const HeaderText = styled.div`
  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const LeaveButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  i {
    font-size: 0.875rem;
  }
`;

const ChatInputWrapper = styled.div`
  padding: 1.5rem;
  background: rgba(10, 61, 12, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(23, 223, 20, 0.1);
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ChatForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
 
  padding: 0.5rem;
  border-radius: 30px;
 
  
  @media (max-width: 768px) {
    padding: 0.3rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
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
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(23, 223, 20, 0.3);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export default function AIChatPage() {
  const navigate = useNavigate();
  const { figureId } = useParams();  // Get figureId from URL params

  // Use the custom hook to fetch the AI figure by ID
  const { data: aiFigure, isLoading, error } = useGetAIFigureByIdQuery(figureId);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const chatContainerRef = useRef(null);

  const userImage = JSON.parse(localStorage.getItem("user"))?.image ?? Logo;
  const aiImage = aiFigure?.image ?? Logo;
  const userId = useSelector((state) => state.user.user?.id); // Assuming user ID is stored in Redux

  // Fetch user details by ID
  const { data: user, isError, refetch: userRefetch } = useGetUserByIdQuery(userId);

  // Log the figure for debugging

  // Extract the model name
  const modelNames = aiFigure?.llmModel?.map((modelString) => {
    try {
      const model = JSON.parse(modelString); // Parse the JSON string into an object
      return model.name || "Unnamed Model";  // Return the name if available
    } catch (error) {
      console.error("Error parsing model string:", error);
      return "Invalid Model";  // Fallback if JSON parsing fails
    }
  }) || [ModelType.GPT_4o_Mini];  // Fallback in case llmModel is undefined
  
  // Fetch chat messages logic (same as before)
  useEffect(() => {
    if (aiFigure) {
      const fetchPreviousMessages = async () => {
        try {
          const response = await axios.get(`${Helpers.apiUrl}ai-figures/previous-chat/${figureId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });

          const previousMessages = response.data?.map((msg) => [
            {
              sender: "You",
              content: msg.sendMessage,
              isUser: true,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            },
            {
              sender: aiFigure?.name || "AI Figure",  // Fallback if aiFigure.name is missing
              content: msg.receiveMessage,
              isUser: false,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
            },
          ]).flat();

          setChatMessages(previousMessages);
        } catch (error) {
          console.error("Failed to load previous messages", error);
        }
      };

      fetchPreviousMessages();
    }
  }, [figureId, aiFigure]);  // Ensure it runs when aiFigure changes

  // Auto-scroll to the bottom whenever the chat messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);  // When chatMessages updates, scroll to bottom

  const handleLeaveRoom = () => {
    navigate("/ai-figure-gallery");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = {
        sender: "You",
        content: message,
        isUser: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");
      setIsLoadingMessage(true);

      try {
        const response = await axios.post(`${Helpers.apiUrl}ai-figures/chat/${figureId}`, { message: userMessage.content }, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        userRefetch();
        const aiResponse = {
          sender: aiFigure?.name || "AI Figure",
          content: response.data || "This is an automated response.",
          isUser: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };

        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        const errorMessage = {
          sender: "AI Bot",
          content: "Sorry, there was an error processing your request.",
          isUser: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setIsLoadingMessage(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex h-100 bg-transparent text-color-light">
      <div style={{
        backgroundColor: "#101010",
        borderRadius: "16px",
        borderRight: "1px solid #00ff00"
      }}className="flex-grow-1 d-flex flex-column chat-message-area full-width ">
        <AIFigureInfoCard
          aiFigure={aiFigure}
          image={aiImage}
          handleLeaveRoom={handleLeaveRoom}
          modelNames={modelNames}
        />
      
        <div ref={chatContainerRef} className="flex-grow-1 pt-4 px-4 overflow-auto chat-message-container">
          {chatMessages?.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.isUser ? "flex-row-reverse" : ""}`}>
              <div style={{ width: "50px", margin: "0 10px" }}>
                <img
                  src={msg.isUser ? userImage : aiImage || Logo}
                  alt={`${msg.isUser ? "User" : "AI"} profile`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load
                />
              </div>
              <MessageBubble message={msg} />
            </div>
          ))}

          {isLoadingMessage && (
            <div className="d-flex">
              <div style={{ width: "50px", margin: "0 10px" }}>
                <img
                  src={aiImage || Logo}
                  alt="AI profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load
                />
              </div>
              <div
                style={{
                  maxWidth: "400px",
                  padding: "1rem",
                  margin: "1rem",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px 20px 20px 0",
                  backgroundColor: "#002200",
                  color: "#fff",
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="spinner-border text-light" role="status" style={{ marginRight: "10px" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <ChatInputWrapper>
          <ChatForm onSubmit={handleSubmit}>
            <ChatInput
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoadingMessage}
            />
            <SendButton 
              type="submit" 
              disabled={isLoadingMessage}
              title="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </SendButton>
          </ChatForm>
        </ChatInputWrapper>
      </div>
    </div>
  );
}
