import React from 'react'
import { useSelector } from 'react-redux';
const RightSidebar = () => {
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  return (
    <>
    {/* Hello world */}
    <div className={`rbt-right-side-panel popup-dashboardright-section ${rightSidebarOpen ? "": "collapsed "}`}>
      <div className="right-side-top">
        <a
          className="btn-default bg-solid-primary"
          data-bs-toggle="modal"
          data-bs-target="#newchatModal"
        >
          <span className="icon">
            <i className="fa-sharp fa-regular fa-circle-plus" />
          </span>
          <span>New Chat</span>
        </a>
      </div>
      <div className="right-side-bottom">
        <div className="small-search search-section mb--20">
          <input type="search" placeholder="Search Here..." />
          <i className="fa-sharp fa-regular fa-search" />
        </div>
        <div className="chat-history-section">
          <h6 className="title">Today</h6>
          <ul className="chat-history-list">
            <li className="history-box active">
              AiWaveDefination
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Your last Question
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Business Shortcurt Methode
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Best way to maintain code Quality
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
          </ul>
        </div>
        <div className="chat-history-section has-show-more">
          <h6 className="title">Yesterday</h6>
          <ul className="chat-history-list has-show-more-inner-content">
            <li className="history-box">
              How to write a code
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Form Html CSS JS
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              HTML Shortcurt Methode
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Best way to maintain code Quality
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              AiWaveDefination
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Your last Question
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Unique Shortcurt Methode
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Generate a circle Image
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
          </ul>
          <div className="rbt-show-more-btn">Show More</div>
        </div>
        <div className="chat-history-section has-show-more">
          <h6 className="title">Previous 7 days</h6>
          <ul className="chat-history-list has-show-more-inner-content">
            <li className="history-box">
              User Assistant Request
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Funtion Js
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Generate a Image
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Best way to maintain code Quality
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              AiWaveDefination
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Your last Question
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Business Shortcurt Methode
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Best way to maintain Remote Team
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
          </ul>
          <div className="rbt-show-more-btn">Show More</div>
        </div>
        <div className="chat-history-section mb--100 has-show-more">
          <h6 className="title">November</h6>
          <ul className="chat-history-list has-show-more-inner-content">
            <li className="history-box">
              AI writing: Free Trial
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Your last Question
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Education Shortcurt Methode
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              1992 Environment Policy
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Senior UX/UI Design
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Your last Question
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Dark Mode Html CSS JS
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
            <li className="history-box">
              Best way to maintain code Quality
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
                      <i className="fa-sharp fa-solid fa-arrows-rotate" />{" "}
                      Regenerate
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
            </li>
          </ul>
          <div className="rbt-show-more-btn">Show More</div>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default RightSidebar