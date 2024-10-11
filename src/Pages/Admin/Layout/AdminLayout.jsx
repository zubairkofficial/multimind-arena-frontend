import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "./AdminDashboard.css";

const AdminLayout = ({children}) => {
  return (
    <div className="admin-dashboard">
      <Header />
      <div className="admin-dashboard-container">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};
export default AdminLayout;
