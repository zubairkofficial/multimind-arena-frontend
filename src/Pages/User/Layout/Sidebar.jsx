import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const user = useSelector((state) => state.user.user); 
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

  // Sidebar menu items
  const mainMenuItems = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
   
    { path: "/add-arena", icon: "fa-plus-circle", label: "Add Arena" },
    { path: "/ai-figure-gallery", icon: "fa-images", label: "AI Figure Gallery" }, // Added Add Arena option
  ];

  const settingMenuItems = [
    { path: "/profile", icon: "fa-user", label: "Profile Details" },
    { path: "/billing", icon: "fa-briefcase", label: "Subscriptions" },
    { path: "/history", icon: "fa-users", label: "History" },
  ];

  return (
    <>
      <div className="popup-mobile-menu">
        <div className="inner-popup">
          <div className="header-top">
            <div className="logo">
              <Link to="/dashboard">
                <img
                  className="logo-light"
                  src="/assets/images/logo/logo.png"
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
                {/* Main menu */}
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {mainMenuItems.map((item, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Link to={item.path}>
                          <i className={`fa-solid ${item.icon}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
                {/* Settings menu */}
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    <li className="has-submenu">
                      <Link
                        className="collapse-btn collapsed"
                        data-bs-toggle="collapse"
                        to="#collapseSettings"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseSettings"
                      >
                        <i className="fa-sharp fa-solid fa-circle-plus" />
                        <span>Settings</span>
                      </Link>
                      <div className="collapse" id="collapseSettings">
                        <ul className="submenu rbt-default-sidebar-list">
                          {settingMenuItems.map((item, index) => (
                            <li key={index}>
                              <Link to={item.path}>
                                <i className={`fa-sharp fa-regular ${item.icon}`} />
                                <span>{item.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* User profile section */}
          <div className="subscription-box d-flex justify-content-center align-items-center">
            <div className="inner">
              <Link
                to="/edit-profile"
                className="autor-info d-flex justify-content-center align-items-center"
              >
                <div className="author-img active">
                  <img
                    className="w-100"
                    src={user.image  || "assets/images/logo/logo.png"}
                    alt="Author"
                  />
                </div>
                <div className="author-desc ">
                  <h6>{userDetails.name}</h6>
                </div>
              </Link>
              <div className="btn-part">
                <Link to="/billing" className="btn-default btn-border">
                  Upgrade
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
