import React, { useEffect, useState } from "react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../features/api/userApi";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import Notyf styles
import { useSelector, useDispatch } from "react-redux"; // Import useSelector to get data from Redux
import { setUser } from "../../../features/userSlice"; // Import your Redux action to update user

const ProfileDetailsForm = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Use useSelector to get the user ID and data from Redux
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  // Mutation hook for updating the user
  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();

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
        name: user.name || "",
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

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
      const updatedUser = await updateUser({ id: userId, ...formData }).unwrap();

      // Dispatch the updated user to the Redux store
      dispatch(setUser({ user: updatedUser.user }));

      // Update the user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser.user));

  
      // Notify the user of the success
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
            <label htmlFor="phoneNumber">Phone Number</label>
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
