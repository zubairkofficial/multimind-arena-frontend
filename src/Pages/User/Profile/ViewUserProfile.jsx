import React, { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../../../features/api/apiSlice";
import { Link } from "react-router-dom";

const ViewUserProfile = () => {
  // State to store user ID
  const [userId, setUserId] = useState(null);


  // Fetch user data using the user ID
  const { data: userData, error, isLoading } = useGetUserByIdQuery(userId, {
    skip: !userId, // Skip query if userId is not available yet
  });
console.log(userData)
  // Load user ID from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);


  useEffect(() => {
    if (error) {
      console.error("Error fetching user details:", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>User Profile</h4>
        <Link to="/edit-profile" className="btn-default btn-small">
          Edit Profile
        </Link>
      </div>

      <div className="text-center mb-4">
        <img
          src="/assets/images/team/team-01.png" // Replace with any placeholder image
          alt="User Profile"
          className="rounded-circle"
          style={{ width: "150px", height: "150px" }}
        />
      </div>

      <form className="d-flex justify-content-center">
        <div>
          {/* Use flexbox to display fields in two columns */}
          <div className="row">
            <div className="col-md-5">
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className=""
                  value={userData?.name || ""}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className=""
                  value={userData?.username || ""}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className=""
                  value={userData?.email || ""}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="form-group mb-3">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className=""
                  value={userData?.phoneNumber || "N/A"}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-10">
              <div className="form-group mb-3">
                <label htmlFor="persona">Persona</label>
                <input
                  type="text"
                  id="persona"
                  className=""
                  value="Coming Soon" // Placeholder for persona
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewUserProfile;
