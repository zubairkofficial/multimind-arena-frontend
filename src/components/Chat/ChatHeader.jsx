
import React from "react";

const ChatHeader = () => {
  return (
    <div className="chat-top-bar">
      <div className="section-title">
        <div className="icon">
          <img src="assets/images/icons/document-file.png" alt="" />
        </div>
        <h6 className="title">Website roadmap title write me</h6>
      </div>
      <div className="dropdown history-box-dropdown">
        <button
          type="button"
          className="more-info-icon dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-regular fa-ellipsis" />
        </button>
        <ul className="dropdown-menu style-one">
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-sharp fa-solid fa-arrows-rotate" /> Regenerate
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-sharp fa-solid fa-tag" /> Pin Chat
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-file-lines" /> Rename
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-share-nodes" /> Share
            </a>
          </li>
          <li>
            <a className="dropdown-item delete-item" href="#">
              <i className="fa-solid fa-trash-can" /> Delete Chat
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
