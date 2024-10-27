import React from "react";
import AIFigureDetailsForm from "./AIFigureDetailsForm";

const UserAddAiFigure = () => {
  return (
    <div className="p-4">
      <h3 className="title">Add AI Figure</h3>

      <div className="single-settings-box profile-details-box overflow-hidden">
        <AIFigureDetailsForm />
      </div>
    </div>
  );
};

export default UserAddAiFigure;
