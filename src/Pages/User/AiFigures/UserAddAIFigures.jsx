import React from "react";
import AIFigureDetailsForm from "./AIFigureDetailsForm";

const UserAddAiFigure = () => {
    // State to track toggle status
    const [isPrivate, setIsPrivate] = React.useState(false);
    
  
    // Handler to toggle the switch
    const handleToggle = () => {
      setIsPrivate((prevState) => !prevState);
    };
  return (
    <div className="p-4">
      <h3 className="title d-flex justify-content-center">Add AI Figure</h3>

      <div className="d-flex ">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={isPrivate}
            onChange={handleToggle}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            {isPrivate ? "Private" : "Public"}
          </label>
        </div>
        <AIFigureDetailsForm />
      </div>
    </div>
  );
};

export default UserAddAiFigure;
