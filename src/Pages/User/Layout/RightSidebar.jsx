import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RightSidebar = () => {
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Replace with your actual token logic

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('http://192.168.18.123:8080/history', {
        
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include your token here
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setHistoryData(data); 
        console.log(data);// Assuming the API returns an array of history items
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [token]);

  return (
    <div className={`rbt-right-side-panel popup-dashboardright-section ${rightSidebarOpen ? "" : "collapsed "}`}>
      <div className="right-side-top">
        <a className="btn-default bg-solid-primary" data-bs-toggle="modal" data-bs-target="#newchatModal">
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
          <h6 className="title">Chat History</h6>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          <ul className="chat-history-list">
            {historyData.length === 0 ? (
              <li>No chat history found.</li>
            ) : (
              historyData.map((item, index) => (
                <li key={index} className="history-box">
                  {item.message || "No message"} {/* Adjust according to the structure of your data */}
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
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
