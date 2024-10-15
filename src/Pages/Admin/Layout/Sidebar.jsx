import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  // Local state to hold user details
  const [userDetails, setUserDetails] = useState({
    name: "User", // default value
    email: "user@example.com", // default value
  });

  // Fetch user data from local storage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as an object in local storage
    if (user) {
      setUserDetails({
        name: user.name || "User",
        email: user.email || "user@example.com",
      });
    }
  }, []);

  return (
    <>
      <div className="popup-mobile-menu">
        <div className="inner-popup">
          <div className="header-top">
            <div className="logo">
              <Link to="/dashboard">
                <img
                  className="logo-light"
                  src="/public/assets/images/logo/logo.png"
                  alt="ChatBot Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`rbt-left-panel popup-dashboardleft-section ${
          sidebarOpen ? "" : "collapsed"
        }`}
      >
        <div className="rbt-default-sidebar">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {/* Dashboard Link */}
                    <li className="d-flex justify-content-center align-items-center">
                      <Link to="/dashboard">
                        <i className="fa-solid fa-home" />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                     {/* New Link: Manage Users */}
                     <li className="d-flex justify-content-center align-items-center">
                      <Link to="/manage-users">
                        <i className="fa-solid fa-person" />
                        <span>Manage Users</span>
                      </Link>
                    </li>
                    {/* New Link: Recent Activity */}
                    <li className="d-flex justify-content-center align-items-center">
                      <Link to="/recent-activity">
                        <i className="fa-solid fa-history" />
                        <span>Recent Activity</span>
                      </Link>
                    </li>
                    {/* New Link: Manage Arenas */}
                    <li className="d-flex justify-content-center align-items-center">
                      <Link to="/manage-arenas">
                        <i className="fa-solid fa-cog" />
                        <span>Manage Arenas</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
                {/* Rest of the sidebar */}
          
              </div>
            </div>
          </div>
          {/* Rest of the sidebar content */}
          <div className="subscription-box">
            <div className="inner">
              <Link to="/profile" className="autor-info">
                <div className="author-img active">
                  <img
                    className="w-100"
                    src="/public/assets/images/team/team-01sm.jpg"
                    alt="Author"
                  />
                </div>
                <div className="author-desc">
                  <h6>{userDetails.name}</h6>
                  <p>{userDetails.email}</p>
                </div>
              </Link>
              <div className="btn-part">
                <Link to="/billing" className="btn-default btn-border">
                  Upgrade To Pro
                </Link>
              </div>
            </div>
          </div>
          <p className="subscription-copyright copyright-text text-center b3 small-text">
            Copyright © 2024
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
