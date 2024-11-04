import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../../../Config/Helpers';

const ChatHistory = () => {
  const { id: figureId } = useParams();
  const [historyData, setHistoryData] = useState({ thisWeek: [], lastWeek: [], earlier: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}user/history/all`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        const categorizedData = categorizeMessages(data);
        setHistoryData(categorizedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const categorizeMessages = (data) => {
      const categories = { thisWeek: [], lastWeek: [], earlier: [] };
      const currentDate = new Date();
      const weekInMs = 7 * 24 * 60 * 60 * 1000;

      data.forEach((user) => {
        user.userAifigureMessage.forEach((msg) => {
          if (msg.aiFigure.id === figureId) {
            const msgDate = new Date(msg.createdAt);
            const timeDiff = currentDate - msgDate;

            let category;
            if (timeDiff < weekInMs) {
              category = 'thisWeek';
            } else if (timeDiff < 2 * weekInMs) {
              category = 'lastWeek';
            } else {
              category = 'earlier';
            }

            categories[category].push({
              id: msg.id,
              sendMessage: msg.sendMessage,
              receiveMessage: msg.receiveMessage,
              aiFigure: msg.aiFigure
            });
          }
        });
      });

      return categories;
    };

    fetchMessages();
  }, [token, figureId]);

  const renderMessageList = (messages) => (
    <ul className="message-history-list" style={{
      maxHeight: '400px', 
      overflowY: 'scroll', 
      padding: '15px', 
      borderRadius: '8px', 
      backgroundColor: '#1E1E1E',
      marginTop: '20px'
    }}>
      {messages.length === 0 ? (
        <li style={{ textAlign: 'center', color: '#CCCCCC' }}>No messages found.</li>
      ) : (
        messages.map((msg) => (
          <li key={msg.id} style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
            }}>
              <div style={{
                maxWidth: '80%',
                alignSelf: 'flex-start',
                backgroundColor: '#101010',
                padding: '12px 20px',
                borderRadius: '15px 15px 15px 0px',
                color: '#FFFFFF',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
              }}>
                <strong>You:</strong> {msg.sendMessage}
              </div>
              <div style={{
                maxWidth: '80%',
                alignSelf: 'flex-end',
                backgroundColor: '#006400',
                padding: '12px 20px',
                borderRadius: '15px 15px 0px 15px',
                color: '#FFFFFF',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
              }}>
                <strong>AI:</strong> {msg.receiveMessage}
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div className={`chat-history-panel ${rightSidebarOpen ? "" : "collapsed"}`} style={{ padding: '20px' }}>
      <div className="chat-history-section" style={{
        textAlign: 'center', 
        color: '#FFFFFF', 
       
        borderRadius: '10px', 
        padding: '20px',
        
      }}>
        <h6 className="title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Chat History</h6>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: '#FF6B6B' }}>{error}</p>}

        <h6 style={{ color: 'white', marginTop: '20px' }}>This Week</h6>
        {renderMessageList(historyData.thisWeek)}

        <h6 style={{ color: 'white', marginTop: '20px' }}>Last Week</h6>
        {renderMessageList(historyData.lastWeek)}

        <h6 style={{ color: 'white', marginTop: '20px' }}>Earlier</h6>
        {renderMessageList(historyData.earlier)}
      </div>
    </div>
  );
};

export default ChatHistory;
