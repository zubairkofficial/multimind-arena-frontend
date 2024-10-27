import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import "./layout.css"; // Import the external CSS file

const UserDashboard = ({ children }) => {
  // Get sidebar open states from Redux
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const rightSidebarOpen = useSelector(
    (state) => state.rightSidebar.rightSidebarOpen
  );

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Header
            sidebarOpen={sidebarOpen}
            rightSidebarOpen={rightSidebarOpen}
          />
          <Sidebar />
          <RightSidebar />
          <div
            className={`table-container content-wrapper ${
              sidebarOpen ? "sidebar-open" : ""
            } ${rightSidebarOpen ? "right-sidebar-open" : ""} ${
              sidebarOpen || rightSidebarOpen ? "hide-on-mobile" : ""
            }`}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
