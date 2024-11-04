import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleRightSidebar } from "./../../../features/sidebarSlice"; // Import actions
import {clearUser} from "../../../features/userSlice";


const Header = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  const user = useSelector((state) => state.user.user); // Access user data directly from Redux store

  const handleSidebar = () => {
    dispatch(toggleSidebar()); // Dispatch action to toggle sidebar state
  };

  const handleRightSidebar = () => {
    dispatch(toggleRightSidebar()); // Dispatch action to toggle right sidebar state
  };

  const handleLogout = () => {
    dispatch(clearUser());  // Assuming you want to clear localStorage on logout (you could also dispatch an action to clear the Redux store)
  };

  return (
    <header className="rbt-dashboard-header rainbow-header header-default header-left-align rbt-fluid-header" >
      <div className="container-fluid position-relative">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-3 col-md-6 col-6">
            <div className="header-left d-flex">
              <div className="expand-btn-grp">
                <button
                  onClick={handleSidebar}
                  className={`bg-solid-primary popup-dashboardleft-btn ${sidebarOpen ? "" : "collapsed"}`}
                >
                  <i className="fa-sharp fa-regular fa-sidebar" />
                </button>
              </div>
              <div className="logo">
                <Link to="/">
                  <img
                    className="logo-light"
                    src="/assets/images/logo/logo.png"
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
                <div className="hamberger"></div>
              </div>
              {/* Start Mobile-Menu-Bar */}
              {/* Start Admin meta Group */}
              <div className="rbt-admin-panel account-access rbt-user-wrapper right-align-dropdown">
                <div className="rbt-admin-card grid-style">
                  <Link className="d-flex align-items-center" to="#">
                    <div className="inner d-flex align-items-center">
                      <div className="">
                        <img
                          src={user.image || "assets/images/logo/logo.png"}
                          className="img-fluid rounded-circle" // Bootstrap classes for responsiveness and circular shape
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                            border: "2px solid #00ff00",
                          }}
                        />
                      </div>
                      <div className="content">
                        <span className="title">{user?.name || "Test User"}</span>
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
                      <div className="">
                        <img
                          src={user.image  || "assets/images/logo/logo.png"}
                          className="img-fluid rounded-circle" // Bootstrap classes for responsiveness and circular shape
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                            border: "2px solid #00ff00",
                          }}
                        />
                      </div>
                      <div className="admin-info">
                        <span className="name">{user?.name || "Test User"}</span>
                        <Link
                          className="rbt-btn-link color-primary"
                          to="/view-profile"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <ul className="user-list-wrapper user-nav">
                      <li>
                        <Link to="/edit-profile">
                          <i className="fa-sharp fa-regular fa-user" />
                          <span>Edit Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop">
                          <i className="fa-sharp fa-regular fa-briefcase" />
                          <span>Plans and Billing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/history">
                          <i className="fa-sharp fa-regular fa-users" />
                          <span>History</span>
                        </Link>
                      </li>
                    </ul>

                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                      <li>
                        <Link to="/" onClick={handleLogout}>
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
              <div className="expand-btn-grp">
                <button
                  onClick={handleRightSidebar}
                  className={`bg-solid-primary popup-dashboardright-btn ${rightSidebarOpen ? "" : "collapsed"}`}
                >
                  <i className="fa-sharp fa-regular fa-sidebar-flip"></i>
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
