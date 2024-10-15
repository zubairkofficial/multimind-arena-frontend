import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./../../../features/sidebarSlice"; // Import the action
const Header = () => {
    const dispatch = useDispatch();
    const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  
    const handleSidebar = () => {
      dispatch(toggleSidebar()); // Dispatch action to toggle sidebar state
    };
  
    const handleLogout = () => {
      localStorage.clear();
    };
  return (
    <header className="rbt-dashboard-header rainbow-header header-default header-left-align rbt-fluid-header">
      <div className="container-fluid position-relative">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-3 col-md-6 col-6">
            <div className="header-left d-flex">
              <div className="expand-btn-grp">
                <button
                  onClick={handleSidebar}
                  className={`bg-solid-primary popup-dashboardleft-btn ${
                    sidebarOpen ? "" : "collapsed"
                  }`}
                >
                  <i className="fa-sharp fa-regular fa-sidebar" />
                </button>
              </div>
              <div className="logo">
                <Link to="/">
                  <img
                    className="logo-light"
                    src="assets/images/logo/logo.png"
                    alt="ChatBot Logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block text-center"></div>
          <div className="col-lg-3 col-md-6 col-6">
            <div className="header-right">
              {/* Start Mobile-Menu-Bar */}
              <div className="mobile-menu-bar ml--10 d-block d-lg-none">
                <div className="hamberger">
                
                </div>
              </div>
              {/* Start Mobile-Menu-Bar */}
              {/* Start Admin meta Group */}
              <div className="rbt-admin-panel account-access rbt-user-wrapper right-align-dropdown">
                <div className="rbt-admin-card grid-style">
                  <Link className="d-flex align-items-center" to="#">
                    <div className="inner d-flex align-items-center">
                      <div className="img-box">
                        <img
                          src="assets/images/team/team-01sm.jpg"
                          alt="Admin"
                        />
                      </div>
                      <div className="content">
                        <span className="title ">Test User</span>
                        <p>test@gmail.com</p>
                      </div>
                    </div>
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-chevron-down" />
                    </div>
                  </Link>
                </div>
                <div className="rbt-user-menu-list-wrapper">
                  <div className="inner">
                    <div className="rbt-admin-profile">
                      <div className="admin-thumbnail">
                        <img
                          src="assets/images/team/team-01sm.jpg"
                          alt="User Images"
                        />
                      </div>
                      <div className="admin-info">
                        <span className="name">Adam Milner</span>
                        <Link
                          className="rbt-btn-link color-primary"
                          to="profile-details.html"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <ul className="user-list-wrapper user-nav">
                      <li>
                        <Link to="profile-details.html">
                          <i className="fa-sharp fa-regular fa-user" />
                          <span>Profile Details</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="notification.html">
                          <i className="fa-sharp fa-regular fa-shopping-bag" />
                          <span>Notification</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="chat-export.html">
                          <i className="fa-sharp fa-regular fa-users" />
                          <span>Chat Export</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="appearance.html">
                          <i className="fa-sharp fa-regular fa-home" />
                          <span>Apperance</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="plans-billing.html">
                          <i className="fa-sharp fa-regular fa-briefcase" />
                          <span>Plans and Billing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="sessions.html">
                          <i className="fa-sharp fa-regular fa-users" />
                          <span>Sessions</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="application.html">
                          <i className="fa-sharp fa-regular fa-list" />
                          <span>Application</span>
                        </Link>
                      </li>
                    </ul>
                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper user-nav">
                      <li>
                        <Link to="#">
                          <i className="fa-solid fa-comments-question" />
                          <span>Help Center</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="profile-details.html">
                          <i className="fa-sharp fa-solid fa-gears" />
                          <span>Settings</span>
                        </Link>
                      </li>
                    </ul>
                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                      <li>
                        <Link to="/" onCliclk={handleLogout}>
                          <i className="fa-sharp fa-solid fa-right-to-bracket" />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Admin meta Group */}
              <div className="expand-btn-grp d-none">
                <button className="bg-solid-primary popup-dashboardright-btn">
                  <i className="fa-sharp fa-regular fa-sidebar-flip" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
