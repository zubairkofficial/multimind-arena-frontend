import React, { useEffect, useState } from "react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "./../../../features/api/apiSlice";
import { Notyf } from "notyf";
import useEnsureUser from "./../../../Hooks/useEnsureUser"; // Import the custom hook
import { CircleGauge } from "lucide-react";

const ProfileDetailsForm = () => {
  // Use custom hook to ensure user data is available
  const { user, isLoading: isFetching, error: fetchError } = useEnsureUser();

  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation(); // API mutation hook

  // Local state to handle form input
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNumber: "",
  });

  // Populate form data when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: `${user.name || ""}`, // Set name
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    e.preventDefault();

    console.log(e.target.id);
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

  if (isFetching) {
    return <div>Loading user data...</div>;
  }

  if (fetchError) {
    return <div>Error loading user data. Please try again later.</div>;
  }

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
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1-234-567-890"
              required
            />
          </div>
        </div>
        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Info"}
            </button>
          </div>
        </div>
        {updateError && <p className="text-danger">Error: {updateError.data?.message}</p>}
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
