import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import AIFigureInfoCard from "./../../../components/Chat/AIFigureInfoCard";
import "./../../../components/ArenaChat/arenachat.css";
import Helpers from "../../../Config/Helpers";

export default function AIChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { figureId } = useParams();
  const [aiFigure, setAiFigure] = useState(location.state);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const chatContainerRef = useRef(null);

  const userImage =
    JSON.parse(localStorage.getItem("user"))?.image ||
    "/assets/images/logo/logo.png";
  const aiImage = aiFigure?.image || "/assets/images/logo/logo.png";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post(
          `${Helpers.apiUrl}ai-figures/chat/${figureId}`,
          { message: userMessage.content },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const aiResponse = {
          sender: aiFigure.name,
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

      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="d-flex h-100 bg-transparent text-color-light">
      <div
        className="arena-info-container"
        style={{
          width: isMobile ? "100%" : "",
          opacity: 1,
          overflow: "hidden",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "100px" : "0",
          zIndex: isMobile ? 10 : "auto",
        }}
      ></div>

      <div className="flex-grow-1 d-flex flex-column chat-message-area full-width">
        <AIFigureInfoCard
          name={aiFigure?.name || "Chat Arena"}
          image={aiImage}
          handleLeaveRoom={handleLeaveRoom}
        />
        <div
          ref={chatContainerRef}
          className="flex-grow-1 pt-4 px-4 overflow-auto chat-message-container"
        >
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${msg.isUser ? "flex-row-reverse" : ""}`}
            >
              <div style={{ width: "50px", margin: "0 10px" }}>
                <img
                  src={msg.isUser ? userImage : aiImage}
                  alt={`${msg.isUser ? "User" : "AI"} profile`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <MessageBubble message={msg} />
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="d-flex">
              <div style={{ width: "50px", margin: "0 10px" }}>
                <img
                  src={aiImage}
                  alt="AI profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
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
                <div
                  className="spinner-border text-light"
                  role="status"
                  style={{ marginRight: "10px" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>AI is thinking...</span>
              </div>
            </div>
          )}
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
              disabled={isLoading} // Disable input while loading
            />
            <button
              type="submit"
              className="btn btn-large rounded-circle position-absolute end-0 top-50 translate-middle-y me-5 btn-success text-white shadow"
              disabled={isLoading} // Disable button while loading
            >
              <i className="fas fa-send"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
