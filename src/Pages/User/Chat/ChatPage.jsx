import React from "react";
import ChatHeader from "./../../../components/Chat/ChatHeader";
import ChatMessageList from "./../../../components/Chat/ChatMessageList";
import ChatInputBar from "./../../../components/Chat/ChatInputBar";

const ChatPage = () => {
  // Sample chat messages array
  const chatMessages = [
    {
      id: 1,
      author: "Adam Milner",
      avatar: "assets/images/team/team-01sm.jpg",
      content: "Website Roadmap title write me",
      type: "author",
    },
    {
      id: 2,
      author: "AiWave",
      avatar: "assets/images/team/avater.png",
      content:
        "Here's a fun fact about the Roman Empire: Ancient Romans used a condiment called 'garum'...",
      type: "ai",
    },
    {
      id: 3,
      author: "Adam Milner",
      avatar: "assets/images/team/team-01sm.jpg",
      content: "How do AiWave work?",
      type: "author",
    },
    {
      id: 4,
      author: "AiWave",
      avatar: "assets/images/team/avater.png",
      content:
        "AiWave boost operational efficiency and bring cost savings to businesses...",
      type: "ai",
    },
    {
      id: 5,
      author: "Adam Milner",
      avatar: "assets/images/team/team-01sm.jpg",
      content: "How can I talk with AiWave?",
      type: "author",
    },
  ];

  return (
    <main className="page-wrapper rbt-dashboard-page">
      <div className="rbt-panel-wrapper">
        <div className="rbt-main-content">
          <div className="rbt-daynamic-page-content">
            <div className="rbt-dashboard-content">
              <div className="content-page">
                <ChatHeader />
                <ChatMessageList messages={chatMessages} />
                <ChatInputBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
