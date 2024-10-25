import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to get data from the global Redux state
import { Link } from "react-router-dom";

const ViewUserProfile = () => {
  // Access the global user data from Redux
  const userData = useSelector((state) => state.user.user); // Assuming the user data is stored in the "user" slice

  // If user data is still loading or unavailable
  if (!userData) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>User Profile</h4>
        <Link to="/edit-profile" className="btn-default btn-small">
          Edit Profile
        </Link>
      </div>

      <div className="text-center mb-4">
        <img
          src={userData.image} // Replace with any placeholder image
          alt="User Profile"
          className="rounded-circle"
          style={{ width: "150px", height: "150px" }}
        />
      </div>

      <form className="d-flex justify-content-center">
        <div>
          <div className="row">
            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-md-6">
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

            <div className="col-md-12">
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
