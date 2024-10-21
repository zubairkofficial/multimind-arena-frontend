import React from "react";

const ChatInputBar = () => {
  return (
    <div className="rbt-static-bar">
      <form className="new-chat-form border-gradient">
        <textarea id="txtarea" rows={1} placeholder="Send a message..." />
        <div className="left-icons">
          <div title="AiWave" className="form-icon icon-gpt">
            <i className="fa-sharp fa-regular fa-aperture" />
          </div>
        </div>
        <div className="right-icons">
          <div className="form-icon icon-plus" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Choose File">
            <input type="file" className="input-file" name="myfile" multiple="" />
            <i className="fa-sharp fa-regular fa-plus" />
          </div>
          <button className="form-icon icon-mic" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Voice Search">
            <i className="fa-regular fa-waveform-lines" />
          </button>
          <button className="form-icon icon-send" id="sendButton" onClick={() => console.log("Sending message")} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Send message">
            <i className="fa-sharp fa-solid fa-paper-plane-top" />
          </button>
        </div>
      </form>
      <p className="b3 small-text">AiWave can make mistakes. Consider checking important information.</p>
    </div>
  );
};

export default ChatInputBar;
