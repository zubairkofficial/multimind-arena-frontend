import React from "react";
import UserDashboard from "../Layout/Index";
import TabNavigation from "./TabNavigation";
import ProfileDetailsForm from "./ProfileDetailsForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import DeleteAccountForm from "./DeleteAccountForm";
import PersonaForm from "./PersonaForm";

const EditProfile = () => {
  return (

      <div className=" mb--0">
        <div className="center-width">
          {/* Dashboard Center Content */}
          <div className="">
            <div className="">
              {/* AiWavesmall Slider */}
              <div className="">
                <h3 className="title d-flex justify-content-center">Profile Details</h3>
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
                      <PersonaForm/>
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

  );
};

export default EditProfile;
