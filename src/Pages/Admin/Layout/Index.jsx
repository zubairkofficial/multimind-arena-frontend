import React from "react";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import DashboardGrid from "./Layout/DashboardGrid";
import RecentActivities from "./Layout/RecentActivities";
import SystemStatus from "./Layout/SystemStatus";
import "./Layout/AdminDashboard.css";

const AdminLayout = (children) => {
  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-dashboard-container">
        <Sidebar />
        <main className="main-content">
          <h1>Admin Dashboard</h1>
         {children}
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;