
// DashboardGrid.js
import React from "react";

const DashboardGrid = () => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-item">
        <h3>Total Users</h3>
        <div className="value">15,234</div>
      </div>
      <div className="dashboard-item">
        <h3>Active Arenas</h3>
        <div className="value">42</div>
      </div>
      <div className="dashboard-item">
        <h3>AI Figures</h3>
        <div className="value">100</div>
      </div>
      <div className="dashboard-item">
        <h3>Daily Active Users</h3>
        <div className="value">1,337</div>
      </div>
    </div>
  );
};

export default DashboardGrid;
