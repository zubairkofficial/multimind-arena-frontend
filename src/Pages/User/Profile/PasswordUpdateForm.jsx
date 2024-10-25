import React, { useState } from "react";
import { useChangePasswordMutation } from "../../../features/api/authApi"; // Adjust the path as per your project structure
import Helpers from "../../../Config/Helpers";

const PasswordUpdateForm = () => {
  // State to hold form inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  
  // Hook for changePassword mutation
  const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== retypeNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }).unwrap();
      Helpers.toast("success","Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="password"
      role="tabpanel"
      aria-labelledby="password-tab"
    >
      <form
        action="#"
        className="rbt-profile-row rbt-default-form row row--15"
        onSubmit={handleSubmit}
      >
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="currentpassword">Current Password</label>
            <input
              id="currentpassword"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="newpassword">New Password</label>
            <input
              id="newpassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="retypenewpassword">Re-type New Password</label>
            <input
              id="retypenewpassword"
              type="password"
              placeholder="Re-type New Password"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button className="btn-default" type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
