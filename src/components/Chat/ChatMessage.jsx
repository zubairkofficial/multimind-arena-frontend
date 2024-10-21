import React from "react";

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-box ${message.type === "author" ? "author-speech" : "ai-speech"}`}>
      <div className="inner">
        <div className="chat-section">
          <div className="author">
            <img className="w-100" src={message.avatar} alt={message.author} />
          </div>
          <div className="chat-content">
            <h6 className="title">
              {message.author}
              {message.type === "ai" && (
                <span className="rainbow-badge-card">
                  <i className="fa-sharp fa-regular fa-check" /> Bot
                </span>
              )}
            </h6>
            <p className="mb--20">{message.content}</p>
            <div className="reaction-section">
              <div className="btn-grp">
                <div className="left-side-btn dropup">
                  <button data-bs-toggle="modal" data-bs-target="#likeModal" className="react-btn btn-default btn-small btn-border">
                    <i className="fa-sharp fa-regular fa-thumbs-up" />
                  </button>
                  <button data-bs-toggle="modal" data-bs-target="#dislikeModal" className="react-btn btn-default btn-small btn-border">
                    <i className="fa-sharp fa-regular fa-thumbs-down" />
                  </button>
                  <button data-bs-toggle="modal" data-bs-target="#shareModal" className="react-btn btn-default btn-small btn-border">
                    <i className="fa-sharp fa-solid fa-share" />
                  </button>
                </div>
                <div className="right-side-btn">
                  <button className="react-btn btn-default btn-small btn-border">
                    <i className="fa-sharp fa-solid fa-repeat" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
