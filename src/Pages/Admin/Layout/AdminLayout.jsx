import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AdminDashboard.css";

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`admin-dashboard ${isCollapsed ? "collapsed" : ""}`}>
      <Header />
      <div className="admin-dashboard-container">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`main-content ${isCollapsed ? "expanded" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
