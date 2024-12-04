import React, { useEffect } from "react";
import UserDashboard from "../Layout/Index";
import ArenaDetailsForm from "./ArenaDetailsForm";
import { useGetArenaByIdQuery } from "../../../features/api/arenaApi"; // Import the query hook
import { useLocation } from "react-router";

const AddArena = () => {
 

const location=useLocation()
  // Fetch the arena details by ID using the custom query hook
  const { data: arenaData, isLoading, isError, error } = useGetArenaByIdQuery(location?.state?.id); // Fetch arena by ID
  useEffect(() => {
    if (isError) {
      console.error("Error fetching arena:", error);
    }
  }, [isError, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb--0">
      <div className="rbt-daynamic-page-content center-width">
        {/* Dashboard Center Content */}
        <div className="rbt-dashboard-content">
          {/* Admin Banner Area */}
          <div className="content-page pb--20">
            <div className="chat-box-list">
              {/* Settings for adding arena */}
              <div className="single-settings-box profile-details-box overflow-hidden">
                <div className="profile-details-tab">
                  <div className="tab-content">
                    <h3 className="fs-4 font-bold ms-5">{location.state?"Edit Arena":"Add New Arena"}</h3>

                    <ArenaDetailsForm
                      arena={arenaData} // Pass the fetched arena data to the form
                      onSubmit={(formData) => console.log("Form submitted", formData)} // Handle form submission
                    />
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
