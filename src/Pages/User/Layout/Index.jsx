import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";

const UserDashboard = ({ children }) => {
  // Get sidebar open state from Redux
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Header sidebarOpen={sidebarOpen} />
          <Sidebar />
          <RightSidebar/>
          <div className={`content-wrapper ${sidebarOpen ? "sidebar-open" : ""}`}>
            {children}
          </div>
        </div>
      </main>
      <style jsx>{`
        .content-wrapper {
          transition: margin-left 0.3s ease;
          margin-left: ${sidebarOpen ? "calc(250px + 40px)" : "calc(70px + 20px)"};
        }
      `}</style>
    </>
  );
};

export default UserDashboard;
