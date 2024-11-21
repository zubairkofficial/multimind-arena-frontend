import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./../../../features/sidebarSlice"; // Import the action
import Logo from '../../../../public/assets/images/logo/logo.png';
import { useGetUserByIdQuery } from "../../../features/api/userApi"; // Import the query hook
import { clearUser } from "../../../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const userId = useSelector((state) => state.user.user?.id); // Assuming user ID is stored in Redux
  const navigate = useNavigate();

  // Fetch user details by ID
  const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);

  const [userDetails, setUserDetails] = useState({
    name: "Test User", // default values
    email: "test@gmail.com",
  });

  useEffect(() => {
    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored as an object
    if (user) {
      setUserDetails({
        name: user.name || "Test User",
        email: user.email || "test@gmail.com",
      });
    }
  }, []);

  const handleSidebar = () => {
    dispatch(toggleSidebar()); // Dispatch action to toggle sidebar state
  };

  const handleLogout =async () => {
    dispatch(clearUser()); // Clear the Redux user state
    navigate("/login");
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
                <Link to="/admin/dashboard">
                  <img
                    className="logo-light"
                    src="/assets/images/logo/logo.png"
                    alt="ChatBot Logo"
                    onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load

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
                <div className="rbt-admin-card grid-style rounded-4" style={{background:"#0a3d0c"}}>
                  <Link className="d-flex align-items-center" to="#">
                    <div className="inner d-flex align-items-center" >
                      <div className="img-box">
                        <img
                          height="10rem"
                          width="27rem"
                          src="/assets/images/team/team-01sm.jpg"
                          alt="Admin"
                        />
                      </div>
                      <div className="content">
                        <span className="title text-capitalize ">{userDetails.name}</span>
                       
                      </div>
                    </div>
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-chevron-down" />
                    </div>
                  </Link>
                </div>
                <div className="rbt-user-menu-list-wrapper" style={{background:"#0a3d0c"}}>
                  <div className="inner">
                    <div className="rbt-admin-profile">
                      <div className="admin-thumbnail">
                        <img
                          src="/assets/images/team/team-01sm.jpg"
                          alt="User Images"
                        />
                      </div>
                      <div className="admin-info">
                        <span className="name text-capitalize">{userDetails.name}</span>
                        <Link
                          className="rbt-btn-link color-primary"
                          to="/admin/view-profile"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <hr style={{ borderTop: "4px solid #00ff00" }} className="mt-0" />

                    <ul className="user-list-wrapper user-nav">
                      <li>
                        <Link to="/profile">
                          <i className="fa-sharp fa-regular fa-user" />
                          <span>Profile Details</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/billing">
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
                        <Link 
                        to="/login"
                        onClick={handleLogout}>
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
