import React from "react";

const TabNavigation = () => (
  <div className="advance-tab-button mb--30">
    <ul
      className="nav nav-tabs tab-button-style-2 justify-content-start"
      id="settinsTab-4"
      role="tablist"
    >
      <li role="presentation">
        <a
          href="#"
          className="tab-button active"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="true"
        >
          <span className="title">Profile</span>
        </a>
      </li>
      <li role="presentation">
        <a
          href="#"
          className="tab-button"
          id="password-tab"
          data-bs-toggle="tab"
          data-bs-target="#password"
          role="tab"
          aria-controls="password"
          aria-selected="false"
        >
          <span className="title">Password</span>
        </a>
      </li>
      <li role="presentation">
        <a
          href="#"
          className="tab-button"
          id="del-account-tab"
          data-bs-toggle="tab"
          data-bs-target="#delaccount"
          role="tab"
          aria-controls="delaccount"
          aria-selected="false"
        >
          <span className="title">Delete Account</span>
        </a>
      </li>
    </ul>
  </div>
);

export default TabNavigation;
