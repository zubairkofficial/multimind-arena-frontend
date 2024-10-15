import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "./../../../features/api/apiSlice"; // Assuming this API exists
import { Notyf } from "notyf";

const ProfileDetailsForm = () => {
  const { user } = useSelector((state) => state.user); // Get user data from the Redux store
  const [updateUser, { isLoading, error }] = useUpdateUserMutation(); // API mutation hook

  // Local state to handle form input
  const [formData, setFormData] = useState({
    name: `${user?.firstname || ""} ${user?.lastname || ""}`, // Combine first and last name into fullname
    username: user?.username || "",
    phonenumber: user?.phonenumber || "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Trigger the API call to update user data
      await updateUser(formData).unwrap();

      const notyf = new Notyf();
      notyf.success("Profile updated successfully.");
    } catch (err) {
      const notyf = new Notyf();
      notyf.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div
      className="tab-pane fade active show"
      id="profile"
      role="tabpanel"
      aria-labelledby="profile-tab"
    >
      <form
        onSubmit={handleSubmit}
        className="rbt-profile-row rbt-default-form row row--15"
      >
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Adam Milner"
              required
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              id="phonenumber"
              type="tel"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="+1-234-567-890"
              required
            />
          </div>
        </div>
        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Info"}
            </button>
          </div>
        </div>
        {error && <p className="text-danger">Error: {error.data.message}</p>}
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
