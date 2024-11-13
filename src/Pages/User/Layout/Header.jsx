import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleRightSidebar } from "./../../../features/sidebarSlice";
import { clearUser } from "../../../features/userSlice";
import { useGetUserByIdQuery } from "../../../features/api/userApi"; // Import the query hook
import Logo from '../../../../public/assets/images/logo/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  const userId = useSelector((state) => state.user.user?.id); // Assuming user ID is stored in Redux

  // Fetch user details by ID
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleRightSidebar = () => {
    dispatch(toggleRightSidebar());
  };

  const handleLogout = () => {
    dispatch(clearUser());
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
              <div className="mobile-menu-bar ml--10 d-block d-lg-none">
                <div className="hamberger"></div>
              </div>
              <div className="rbt-admin-panel account-access rbt-user-wrapper right-align-dropdown">
                <div className="rbt-admin-card grid-style">
                  <Link className="d-flex align-items-center" to="#">
                    <div className="inner d-flex align-items-center">
                      <div className="">
                        <img
                          src={user?.image || Logo}
                          alt="not found"
                          className="img-fluid rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                            border: "2px solid #00ff00",
                          }}
                          onError={(e) => (e.target.src = Logo)}
                        />
                      </div>
                      <div className="content">
                        <span className="title">{user?.name || "Loading..." }</span>
                        <span className="available-coins">
                          {user?.availableCoins ? ` ${user.availableCoins} coins` : "No Coins"}
                        </span>
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
                          src={user?.image || Logo}
                          className="img-fluid rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                            border: "2px solid #00ff00",
                          }}
                          onError={(e) => (e.target.src = Logo)}
                        />
                      </div>
                      <div className="admin-info">
                        <span className="name">{user?.name || "Loading..."}</span>
                        <Link className="rbt-btn-link color-primary" to="/view-profile">
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
