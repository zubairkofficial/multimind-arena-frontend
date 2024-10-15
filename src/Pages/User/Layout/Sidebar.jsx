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
        //email: user.email || "user@example.com",
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
                  src="assets/images/logo/logo.png"
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
                    <li className="d-flex justify-content-center align-items-center">
                      <Link to="/dashboard">
                        <i className="fa-solid fa-home" />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    <li className="has-submenu">
                      <Link
                        className="collapse-btn collapsed"
                        data-bs-toggle="collapse"
                        to="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        <i className="fa-sharp fa-solid fa-circle-plus" />
                        <span>Setting</span>
                      </Link>
                      <div className="collapse" id="collapseExample">
                        <ul className="submenu rbt-default-sidebar-list">
                          <li>
                            <Link to="/profile">
                              <i className="fa-sharp fa-regular fa-user" />
                              <span>Profile Details</span>
                            </Link>
                          </li>

                          <li>
                            <Link to="/billing">
                              <i className="fa-sharp fa-regular fa-briefcase" />
                              <span>Subscriptions</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/history">
                              <i className="fa-sharp fa-regular fa-users" />
                              <span>History</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <div className="rbt-sm-separator" />
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    <li>
                      <Link to="/terms-policy">
                        <i className="fa-sharp fa-regular fa-briefcase" />
                        <span>Terms &amp; Policy</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="subscription-box d-flex justify-content-center align-items-center">
            <div className="inner">
              <Link to="/profile" className="autor-info d-flex justify-content-center align-items-center">
                <div className="author-img active">
                  <img
                    className="w-100"
                    src="assets/images/team/team-01sm.jpg"
                    alt="Author"
                  />
                </div>
                <div className="author-desc ">
                  <h6>{userDetails.name}</h6>
                  {/* <p>{userDetails.email}</p> */}
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
            Copyright © 2024{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
