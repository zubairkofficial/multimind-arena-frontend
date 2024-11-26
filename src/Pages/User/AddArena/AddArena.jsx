import React, { useState } from "react";
import ArenaDetailsForm from "./ArenaDetailsForm"; // New form for adding arena details
import { useGetAllLlmModelsQuery } from "../../../features/api/LlmModelApi"; // Import query hook for LLM Models

const UserAddArena = () => {
  // State to track toggle status
  const [isPrivate, setIsPrivate] = useState(false);
  const { data: llmModels, error, isLoading } = useGetAllLlmModelsQuery();

  // Handler to toggle the switch
  const handleToggle = () => {
    setIsPrivate((prevState) => !prevState);
  };

  return (
    <div className="p-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
  <h3 className="title fs-5 font-bold">Add New Arena</h3>
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
</div>


<ArenaDetailsForm isPrivate={isPrivate} llmModels={llmModels} />
    </div>
  );
};

export default UserAddArena;
