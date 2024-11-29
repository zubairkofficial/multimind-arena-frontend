import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaRequestStatus, UserTier } from "../../../common"; // Correct named import for ArenaRequestStatus
import { useGetUserByIdQuery } from "../../../features/api/userApi";
import "./layout.css";
const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const user = useSelector((state) => state.user.user);
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch,
  } = useGetUserByIdQuery(user.id);
console.log("userData",userData?.tier)
  const [userDetails, setUserDetails] = useState({
    name: "User", // default value
    email: "user@example.com", // default value
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as an object in local storage
    if (user) {
      setUserDetails({
        name: user.name || "User",
      });
      refetch();
    }
  }, []);

  // Sidebar menu items
  const mainMenuItems = [
    { path: "/dashboard", icon: "fa-home", label: "Playground" },
    ...(userData?.tier === UserTier.FREE ? [
    {
      path: "/request-arena",
      icon: "fa-plus-circle",
      label: "Request",
    }
  ] : []),
    // {
    //   path:
    //   userData?.tier==UserTier.PREMIUM?"/add-arena":
    //     userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED
    //       ? "/add-arena"
    //       : null,
    //   icon: "fa-plus-circle",
    //   label:
    //   userData?.tier==UserTier.PREMIUM?"Add Arena":
    //     userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED
    //       ? "Add Arena"
    //       : null,
    // },
    {
      path: "/ai-figure-gallery",
      icon: "fa-images",
      label: "AI Figure Gallery",
    },
  ];

  const settingMenuItems = [
    { path: "/view-profile", icon: "fa-user", label: "Profile Details" },
    { path: "/purchase", icon: "fa-shop", label: "Buy Arena Coins" },
    { path: "/deals", icon: "fa-gift", label: "Subscription Bundle Deals" },
  ];

  const location = useLocation(); // Get the current route

  // Helper function to check if the current path matches the link's path
  const isActive = (path) => {
    return location.pathname === path ? "active" : ""; // Return 'active' class if the path matches
  };
  console.log("isActive", isActive);
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
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list ">
                    {mainMenuItems?.map((item, index) => (
                      <li
                        key={index}
                        className={`d-flex justify-content-center align-items-center fs-3 ${isActive(
                          item.path
                        )}`}
                      >
                        <Link to={item.path}>
                          <i
                            style={{
                              color:
                                isActive(item.path) === "active"
                                  ? "#00ff00"
                                  : "",
                            }} // Check if the link is active
                            className={`fa-solid ${item.icon}`}
                          />
                          <span
                            style={{
                              color:
                                isActive(item.path) === "active"
                                  ? "#00ff00"
                                  : "",
                            }} // Apply the same style to the text
                            className="fs-4 font-bold"
                          >
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="rbt-sm-separator" />
                <nav className="mainmenu-nav" >
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
                          {settingMenuItems?.map((item, index) => (
                            <li key={index} className={isActive(item.path)}>
                              <Link to={item.path}>
                                <i
                                  className={`fa-sharp fa-regular ${item.icon}`}
                                />
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
                <Link to="/deals" className="btn-default btn-border" style={{background:"#0a3d0c",color:"#00ff00"}}>
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
