import React from "react";
import UserDashboard from "../Layout/Index";
// import TabNavigation from "./TabNavigation"; // Reuse the same tab navigation structure
import ArenaDetailsForm from "./ArenaDetailsForm"; // New form for adding arena details

const AddArena = () => {
  return (

      <div className=" mb--0">
        <div className="rbt-daynamic-page-content center-width">
          {/* Dashboard Center Content */}
          <div className="rbt-dashboard-content">
              {/* Admin Banner Area */}
            <div className="content-page pb--20">

              <div className="chat-box-list">
                {/* Settings for adding arena */}
                <div className="single-settings-box profile-details-box overflow-hidden">
                  <div className="profile-details-tab">
                    {/* <TabNavigation /> */}
                    <div className="tab-content">
            <h3 className=" fs-4 font-bold ms-5">Add New Arena</h3>

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
