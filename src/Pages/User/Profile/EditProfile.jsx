import React from "react";
import UserDashboard from "../Layout/Index";
import TabNavigation from "./TabNavigation";
import ProfileDetailsForm from "./ProfileDetailsForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import DeleteAccountForm from "./DeleteAccountForm";

const EditProfile = () => {
  return (
    <UserDashboard>
      <div className="rbt-main-content mb--0">
        <div className="rbt-daynamic-page-content center-width">
          {/* Dashboard Center Content */}
          <div className="rbt-dashboard-content">
            <div className="banner-area">
              {/* AiWavesmall Slider */}
              <div className="settings-area">
                <h3 className="title">Profile Details</h3>
              </div>
            </div>
            <div className="content-page pb--50">
              <div className="chat-box-list">
                {/* AiWaveSettings Settings */}
                <div className="single-settings-box profile-details-box overflow-hidden">
                  <div className="profile-details-tab">
                    <TabNavigation />
                    <div className="tab-content">
                      <ProfileDetailsForm />
                      <PasswordUpdateForm />
                      <DeleteAccountForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default EditProfile;
