import React from "react";
import UserDashboard from "../Layout/Index";
// import TabNavigation from "./TabNavigation"; // Reuse the same tab navigation structure
import ArenaDetailsForm from "./ArenaDetailsForm"; // New form for adding arena details

const UserAddArena = () => {
  return (
    <div className="p-5">
      {/* Admin Banner Area */}

      <h3 className="title d-flex ps-5 fs-5 font-bold ">Add New Arena</h3>

   

      <ArenaDetailsForm />
    </div>
  );
};

export default UserAddArena;
