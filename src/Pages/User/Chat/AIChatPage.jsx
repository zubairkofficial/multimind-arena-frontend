import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAIFigureByIdQuery } from "../../../features/api/aiFigureApi"; // Import the query hook
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from '../../../features/api/userApi'; // Import the query hook

import MessageBubble from "./MessageBubble";
import AIFigureInfoCard from "./../../../components/Chat/AIFigureInfoCard";
import Helpers from "../../../Config/Helpers";
import Logo from '../../../../public/assets/images/logo/logo.png';
import { ModelType } from "../../../common";

export default function AIChatPage() {
  const navigate = useNavigate();
  const { figureId } = useParams();  // Get figureId from URL params

  // Use the custom hook to fetch the AI figure by ID
  const { data: aiFigure, isLoading, error } = useGetAIFigureByIdQuery(figureId);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
      <div className="flex-grow-1 d-flex flex-column chat-message-area full-width">
        <AIFigureInfoCard
          name={aiFigure?.name ?? "Chat Arena"}
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

        <div className="p-1 border-color-light chat-input-container">
          <form onSubmit={handleSubmit} className="mt-5 d-flex align-items-center w-100 position-relative bg-transparent">
            <input
              type="text"
              className="form-control p-3 bg-color-black text-light pr-5"
              style={{ borderRadius: "50px",     fontSize: "1.2rem",  }}
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoadingMessage}
            />
            <button
              type="submit"
              className="btn btn-large rounded-circle position-absolute end-0 top-50 translate-middle-y me-5 btn-success text-white shadow"
              disabled={isLoadingMessage}
            >
              <i className="fas fa-send"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
