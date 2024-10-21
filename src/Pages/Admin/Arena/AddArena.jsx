import React from "react";
import UserDashboard from "../Layout/Index";
// import TabNavigation from "./TabNavigation"; // Reuse the same tab navigation structure
import ArenaDetailsForm from "./ArenaDetailsForm"; // New form for adding arena details

const AddArena = () => {
  return (

      <div className="rbt-main-content mb--0">
        <div className="rbt-daynamic-page-content center-width">
          {/* Dashboard Center Content */}
          <div className="rbt-dashboard-content">
            <div className="banner-area">
              {/* Admin Banner Area */}
              <div className="settings-area">
                <h3 className="title">Add New Arena</h3>
              </div>
            </div>
            <div className="content-page pb--50">
              <div className="chat-box-list">
                {/* Settings for adding arena */}
                <div className="single-settings-box profile-details-box overflow-hidden">
                  <div className="profile-details-tab">
                    {/* <TabNavigation /> */}
                    <div className="tab-content">
                      <ArenaDetailsForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default AddArena;
