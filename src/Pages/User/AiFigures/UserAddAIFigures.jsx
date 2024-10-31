import React from "react";
import AIFigureDetailsForm from "./AIFigureDetailsForm";

const UserAddAiFigure = () => {
  return (
    <div className="p-4">
      <h3 className="title d-flex justify-content-center">Add AI Figure</h3>

      <div className="">
        <AIFigureDetailsForm />
      </div>
    </div>
  );
};

export default UserAddAiFigure;
