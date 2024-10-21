import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const dispatch = useDispatch();



  const handleSidebar = () => {
    dispatch(toggleSidebar()); // Dispatch action to toggle sidebar state
  };

  return (
    <>
      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className = {`table-container content-wrapper ${sidebarOpen ? "hide-on-mobile": ""}`}>
            <Outlet />
          </div>
        </div>
      </main>
      <style jsx>{`
        .content-wrapper {
          transition: margin 0.3s ease; /* Smooth transition for both margins */
          margin-left: ${sidebarOpen
            ? "310px"
            : "40px"}; /* Adjust the left margin for the sidebar */
         
        /* Add padding to ensure content is below the header */
       
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
           /* Adjust padding for mobile if the header height is smaller */
          }
        }
      `}</style>
    </>
  );
};

export default Index;
