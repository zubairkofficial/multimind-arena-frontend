import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import MessageBubble from "./../../../components/ArenaChat/MessageBubble";
import AIFigureInfoCard from "./../../../components/Chat/AIFigureInfoCard";
import "./../../../components/ArenaChat/arenachat.css";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import Helpers from "../../../Config/Helpers";

export default function AIChatPage() {
  const location = useLocation();
  const { figureId } = useParams();
  const [aiFigure, setAiFigure] = useState(location.state);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    console.log("Data got", aiFigure);
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
        }),
      };

      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");
      console.log(figureId);
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
        console.log("Pakistan", response);
        const aiResponse = {
          sender: aiFigure.name,
          content: response.data || "This is an automated response.",
          isUser: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error("Error sending message to AI:", error);
        const errorMessage = {
          sender: "AI Bot",
          content: "Sorry, there was an error processing your request.",
          isUser: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setMessage("");
    }
  };

  return (
    <div className="d-flex h-100 bg-transparent text-color-light">
      <div
        className={"arena-info-container"}
        style={{
          width: isMobile ? "100%" : "",
          opacity: 1,
          overflow: "hidden",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "100px" : "0",
          zIndex: isMobile ? 10 : "auto",
        }}
      ></div>

      <div
        className={`flex-grow-1 d-flex flex-column chat-message-area full-width`}
      >
        <AIFigureInfoCard
          name={aiFigure?.name || "Chat Arena"}
          image={aiFigure?.image || "/assets/images/logo/logo.png"}
        />
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
    </div>
  );
}
