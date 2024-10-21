import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

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
              sidebarOpen || rightSidebarOpen ? "hide-on-mobile" : ""
            }`}
          >
           <Outlet/>
          </div>
        </div>
      </main>

      <style jsx>{`
        .content-wrapper {
          transition: margin 0.3s ease; /* Smooth transition for both margins */
          margin-left: ${sidebarOpen
            ? "290px"
            : "30px"}; /* Adjust the left margin for the sidebar */
          margin-right: ${rightSidebarOpen
            ? "320px"
            : "30px"}; /* Adjust the right margin for the right sidebar */
       /* Add padding to ensure content is below the header */
          // background: radial-gradient(
          //   circle,
          //   rgba(144, 238, 144, 0.3) 0%,
          //   rgba(255, 255, 255, 0) 100%
          // ); /* Lightest green radial gradient */
        }

        /* Hide content when either sidebar is open on mobile */
        @media (max-width: 768px) {
          .content-wrapper.hide-on-mobile {
            display: none;
          }

          .content-wrapper {
            margin-left: ${sidebarOpen
              ? "200px"
              : "15px"}; /* Adjust margins for smaller screens */
            margin-right: ${rightSidebarOpen ? "200px" : "15px"};
            padding-top: 60px; /* Adjust padding for mobile if the header height is smaller */
          }
        }
      `}</style>
    </>
  );
};

export default UserDashboard;
