import React from "react";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import DashboardGrid from "./Layout/DashboardGrid";
import RecentActivities from "./Layout/RecentActivities";
import SystemStatus from "./Layout/SystemStatus";
import "./Layout/AdminDashboard.css";
import AdminLayout from "./Layout/AdminLayout";
const AdminDashboard = () => {
  return (
    <>
      <AdminLayout>
        <DashboardGrid />
        <RecentActivities />
        <SystemStatus />
      </AdminLayout>
    </>
  );
};
export default AdminDashboard;
