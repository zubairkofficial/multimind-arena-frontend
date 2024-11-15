import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from '../../../../public/assets/images/logo/logo.png';
import { ArenaRequestStatus } from '../../../common';  // Correct named import for ArenaRequestStatus
import { useGetUserByIdQuery } from "../../../features/api/userApi";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const user = useSelector((state) => state.user.user);
  const { data: userData, isLoading: userLoading, error: userError,refetch } = useGetUserByIdQuery(user.id);
 


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
      });
    refetch()

    }
  }, []);


  // Sidebar menu items
  const mainMenuItems = [
    { path: "/dashboard", icon: "fa-home", label: "Playground" },
    {
      path: userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED ? "/add-arena" : "/request-arena",
      icon: "fa-plus-circle",
      label: userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED ? "Add Arena" : "Request"
    },
    { path: "/ai-figure-gallery", icon: "fa-images", label: "AI Figure Gallery" },
  ];

  const settingMenuItems = [
    { path: "/view-profile", icon: "fa-user", label: "Profile Details" },
    { path: "/purchase", icon: "fa-shop", label: "Buy Arena Coins" },
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
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {mainMenuItems.map((item, index) => (
                      <li key={index} className="d-flex justify-content-center align-items-center">
                        <Link to={item.path}>
                          <i className={`fa-solid ${item.icon}`} />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
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
          <div className="subscription-box d-flex justify-content-center align-items-center">
            <div className="inner">
              <Link
                to="/edit-profile"
                className="autor-info d-flex justify-content-center align-items-center"
              >
                <div className=" ">
                  <img
                    className="img-fluid rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "10px",
                      border: "2px solid #00ff00",
                    }}
                    src={user.image || Logo}
                    alt="Author"
                    onError={(e) => (e.target.src = Logo)} // Fallback to Logo if the image fails to load
                  />
                </div>
                <div className="author-desc ">
                  <h6>{userDetails.name}</h6>
                </div>
              </Link>
              <div className="btn-part">
                <Link to="/shop" className="btn-default btn-border">
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
