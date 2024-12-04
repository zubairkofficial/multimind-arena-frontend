import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Helpers from '../../../Config/Helpers';

const RightSidebar = () => {
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  const [aiFigures, setAiFigures] = useState({ thisWeek: [], lastWeek: [], earlier: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}user/history/all`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.data;
        const categorizedFigures = categorizeUniqueFigures(data);
        setAiFigures(categorizedFigures);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const categorizeUniqueFigures = (data) => {
      const figuresByTime = { thisWeek: [], lastWeek: [], earlier: [] };
      const currentDate = new Date();
      const weekInMs = 7 * 24 * 60 * 60 * 1000;

      const uniqueFiguresMap = new Map();

      data.forEach((item) => {
        item.userAifigureMessage.forEach((msg) => {
          const figureId = msg.aiFigure.id;
          const msgDate = new Date(msg.createdAt);

          if (!uniqueFiguresMap.has(figureId)) {
            uniqueFiguresMap.set(figureId, { ...msg.aiFigure, date: msgDate });
          }
        });
      });

      uniqueFiguresMap.forEach((figure) => {
        const timeDiff = currentDate - figure.date;
        if (timeDiff < weekInMs) {
          figuresByTime.thisWeek.push(figure);
        } else if (timeDiff < 2 * weekInMs) {
          figuresByTime.lastWeek.push(figure);
        } else {
          figuresByTime.earlier.push(figure);
        }
      });

      return figuresByTime;
    };

    fetchHistoryData();
  }, [token]);
  // Handle figure click to navigate to the chat page
  const handleFigureClick = (id,figure) => {
    navigate(`/chat/${id}`,{ state: figure});
  };

  const renderFigureList = (figures) => (
    <ul className="chat-history-list">
      {figures.length === 0 ? (
        <li>No AI figures found.</li>
      ) : (
        figures?.map((figure) => (
          <li key={figure.id} style={{ backgroundColor: '#101010' }}>
            <Link
              to={`#`}
              style={{
                backgroundColor: '#101010',
                textDecoration: 'none',
                color: '#00FF00',
                padding: '12px',
                display: 'block',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onClick={() => handleFigureClick(figure.id,figure)} // Navigate to chat page on click
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#00FF00';
                e.target.style.borderRadius = '10px';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#101010';
                e.target.style.color = '#00FF00';
              }}
            >
              {figure.name}
            </Link>
          </li>
        ))
      )}
    </ul>
  );

  return (
    <div className={`rbt-right-side-panel popup-dashboardright-section ${rightSidebarOpen ? "" : "collapsed "}`}>
      <div className="right-side-bottom">
        <div className="small-search search-section mb--20">
          <input type="search" placeholder="Search Here..." />
          <i className="fa-sharp fa-regular fa-search" />
        </div>
        <div className="chat-history-section">
          <h6 className="title">AI Figures Interacted</h6>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <h6 style={{ color: 'white', marginTop: '20px' }}>This Week</h6>
          {renderFigureList(aiFigures.thisWeek)}

          <h6 style={{ color: 'white', marginTop: '20px' }}>Last Week</h6>
          {renderFigureList(aiFigures.lastWeek)}

          <h6 style={{ color: 'white', marginTop: '20px' }}>Earlier</h6>
          {renderFigureList(aiFigures.earlier)}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
