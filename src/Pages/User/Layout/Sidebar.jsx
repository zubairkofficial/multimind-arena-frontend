import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = () => {
    const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  return (
    <>
      <div className="popup-mobile-menu">
        <div className="inner-popup">
          <div className="header-top">
            <div className="logo">
              <Link to="index.html">
                <img
                  className="logo-light"
                  src="assets/images/logo/logo.png"
                  alt="ChatBot Logo"
                />
              </Link>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="fa-sharp fa-regular fa-x" />
              </button>
            </div>
          </div>
          <div className="content">
            <ul className="mainmenu">
              <li>
                <Link to="index.html">Home</Link>
              </li>
              <li className="has-dropdown has-menu-child-item position-relative">
                <Link to="/">
                  Tools <i className="fa-regular fa-chevron-down" />
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="text-generator.html">
                      <span>Text Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="image-generator.html">
                      <span>Image Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="code-generator.html">
                      <span>Code Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="image-editor.html">
                      <span>Image Editor</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="vedio-generator.html">
                      <span>Vedio Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="email-generator.html">
                      <span>Email Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      tabIndex={-1}
                      className="disabled"
                      aria-disabled="true"
                    >
                      <span>Audio Generator</span>
                      <div className="rainbow-badge-card badge-sm ml--5">
                        COMING
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      tabIndex={-1}
                      className="disabled"
                      aria-disabled="true"
                    >
                      <span>Edu. feedback</span>
                      <div className="rainbow-badge-card badge-sm ml--5">
                        COMING
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      tabIndex={-1}
                      className="disabled"
                      aria-disabled="true"
                    >
                      <span>Website Generator</span>
                      <div className="rainbow-badge-card badge-sm ml--5">
                        COMING
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="with-megamenu has-menu-child-item">
                <Link to="#">
                  Pages <i className="fa-regular fa-chevron-down" />
                </Link>
                <div className="rainbow-megamenu">
                  <div className="wrapper">
                    <div className="row row--0">
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          <li>
                            <h3 className="rbt-short-title">Inner Pages</h3>
                          </li>
                          <li>
                            <Link to="styleguide.html">
                              <span>Style Guide</span>
                              <div className="rainbow-badge-card badge-sm ml--5">
                                Hot
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link to="blog.html">
                              <span>Blog</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">
                              <span>Blog Details</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="pricing.html">
                              <span>Pricing</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="contact.html">
                              <span>Contact</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="signin.html">
                              <span>Sign In</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="signup.html">
                              <span>Sign Up</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="Team.html">
                              <span>Team</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="terms-policy.html">
                              <span>Terms &amp; Policy</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="privacy-policy.html">
                              <span>Privacy Policy</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          <li>
                            <h3 className="rbt-short-title">DASHBOARD PAGES</h3>
                          </li>
                          <li>
                            <Link to="profile-details.html">
                              <span>Profile</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="notification.html">
                              <span>Notification</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="chat-export.html">
                              <span>Chat Export</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="appearance.html">
                              <span>Apperance</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="plans-billing.html">
                              <span>Plans and Billing</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="sessions.html">
                              <span>Sessions</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="application.html">
                              <span>Application</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="release-notes.html">
                              <span>Release notes</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="help.html">
                              <span>Help &amp; FAQs</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item br--0">
                          <li>
                            <h3 className="rbt-short-title">
                              Upcoming Advance Elements
                            </h3>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Product Description</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Youtube Vedio to Post</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Grammar Check</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Generate From RSS</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Vedio Script</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Audio to Text</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Subscription</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Maintanence</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="disabled">
                              <span>Coming Soon</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <div className="header-menu-img">
                          <img
                            src="assets/images/menu-img/menu-img-2.png"
                            alt="Menu Split Image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="roadmap.html">Roadmap</Link>
              </li>
              <li>
                <Link to="utilize.html">How to use</Link>
              </li>
            </ul>
            <div className="rbt-sm-separator" />
            <div className="rbt-default-sidebar-wrapper">
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li>
                    <Link to="text-generator.html">
                      <i className="fa-sharp fa-regular fa-monitor" />
                      <span>Welcome</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="plans-billing.html">
                      <i className="fa-sharp fa-regular fa-briefcase" />
                      <span>Manage Subsription</span>
                    </Link>
                  </li>
                </ul>
                <div className="rbt-sm-separator" />
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li>
                    <Link to="text-generator.html">
                      <img
                        src="assets/images/generator-icon/text.png"
                        alt="AI Generator"
                      />
                      <span>Text Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="image-generator.html">
                      <img
                        src="assets/images/generator-icon/photo.png"
                        alt="AI Generator"
                      />
                      <span>Image Generator</span>
                      <div className="rainbow-badge-card badge-sm ml--10">
                        Hot
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="code-generator.html">
                      <img
                        src="assets/images/generator-icon/code-editor.png"
                        alt="AI Generator"
                      />
                      <span>Code Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="image-editor.html">
                      <img
                        src="assets/images/generator-icon/photo.png"
                        alt="AI Generator"
                      />
                      <span>Image Editor</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="vedio-generator.html">
                      <img
                        src="assets/images/generator-icon/video-camera.png"
                        alt="AI Generator"
                      />
                      <span>Vedio Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="email-generator.html">
                      <img
                        src="assets/images/generator-icon/email.png"
                        alt="AI Generator"
                      />
                      <span>Email Generator</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      tabIndex={-1}
                      className="disabled"
                      aria-disabled="true"
                      role="button"
                    >
                      <img
                        src="assets/images/generator-icon/website-design.png"
                        alt="AI Generator"
                      />
                      <span>Website Generator</span>
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
                      to="#collapseExampleMenu"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExampleMenu"
                    >
                      <i className="fa-sharp fa-solid fa-circle-plus" />
                      <span>Setting</span>
                    </Link>
                    <div className="collapse" id="collapseExampleMenu">
                      <ul className="submenu rbt-default-sidebar-list">
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
                    </div>
                  </li>
                  <li>
                    <Link to="#">
                      <i className="fa-sharp fa-regular fa-award" />
                      <span>Help &amp; FAQ</span>
                    </Link>
                  </li>
                </ul>
                <div className="rbt-sm-separator" />
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  <li>
                    <Link to="release-notes.html">
                      <i className="fa-sharp fa-regular fa-bell" />
                      <span>Release notes</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="terms-policy.html">
                      <i className="fa-sharp fa-regular fa-briefcase" />
                      <span>Terms &amp; Policy</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Start Header Btn  */}
          <div className="header-btn d-block d-md-none">
            <Link
              className="btn-default @@btnClass"
              target="_blank"
              to="text-generator.html"
            >
              Get Started Free
            </Link>
          </div>
          {/* End Header Btn  */}
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
                    <li>
                      <Link to="text-generator.html">
                        <img
                          src="assets/images/generator-icon/text.png"
                          alt="AI Generator"
                        />
                        <span>Text Generator</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="image-generator.html">
                        <img
                          src="assets/images/generator-icon/photo.png"
                          alt="AI Generator"
                        />
                        <span>Image Generator</span>
                        <div className="rainbow-badge-card badge-sm ml--10">
                          NEW
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="code-generator.html">
                        <img
                          src="assets/images/generator-icon/code-editor.png"
                          alt="AI Generator"
                        />
                        <span>Code Generator</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="image-editor.html">
                        <img
                          src="assets/images/generator-icon/photo.png"
                          alt="AI Generator"
                        />
                        <span>Image Editor</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="vedio-generator.html">
                        <img
                          src="assets/images/generator-icon/video-camera.png"
                          alt="AI Generator"
                        />
                        <span>Vedio Generator</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="email-generator.html">
                        <img
                          src="assets/images/generator-icon/email.png"
                          alt="AI Generator"
                        />
                        <span>Email Generator</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        tabIndex={-1}
                        className="disabled"
                        aria-disabled="true"
                      >
                        <img
                          src="assets/images/generator-icon/website-design.png"
                          alt="AI Generator"
                        />
                        <span>Website Generator</span>
                        <div className="rainbow-badge-card badge-sm ml--10">
                          PRO
                        </div>
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
                      </div>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-sharp fa-regular fa-award" />
                        <span>Help &amp; FAQ</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="rbt-sm-separator" />
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    <li>
                      <Link to="release-notes.html">
                        <i className="fa-sharp fa-regular fa-bell" />
                        <span>Release notes</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="terms-policy.html">
                        <i className="fa-sharp fa-regular fa-briefcase" />
                        <span>Terms &amp; Policy</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="subscription-box">
            <div className="inner">
              <Link to="profile-details.html" className="autor-info">
                <div className="author-img active">
                  <img
                    className="w-100"
                    src="assets/images/team/team-01sm.jpg"
                    alt="Author"
                  />
                </div>
                <div className="author-desc">
                  <h6>Adam Milner</h6>
                  <p>trentadam@net</p>
                </div>
                <div className="author-badge">Free</div>
              </Link>
              <div className="btn-part">
                <Link to="pricing.html" className="btn-default btn-border">
                  Upgrade To Pro
                </Link>
              </div>
            </div>
          </div>
          <p className="subscription-copyright copyright-text text-center b3  small-text">
            © 2024{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
