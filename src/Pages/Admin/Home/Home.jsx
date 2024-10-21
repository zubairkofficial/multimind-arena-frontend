import React from "react";
import "./Home.css";
import AdminCards from "./AdminCards";
import RecentActivities from "./RecentActivities";
import SystemStatus from "./SystemStatus";

const Home = () => {
  return (
    <div className="admin-dashboard-container container mt-4">
      <AdminCards />
      <RecentActivities />
      <SystemStatus />
    </div>
  );
};

export default Home;
