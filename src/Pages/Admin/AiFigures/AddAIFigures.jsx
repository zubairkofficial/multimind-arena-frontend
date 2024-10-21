import React from "react";
import AIFigureDetailsForm from "./AIFigureDetailsForm";

const AddAIFigure = () => {
  return (
    <div className="rbt-main-content mb--0">
      <div className="rbt-daynamic-page-content center-width">
        <div className="rbt-dashboard-content">
          <div className="banner-area">
            <div className="settings-area">
              <h3 className="title">Add AI Figure</h3>
            </div>
          </div>
          <div className="content-page pb--50">
            <div className="chat-box-list">
              <div className="single-settings-box profile-details-box overflow-hidden">
                <AIFigureDetailsForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAIFigure;
