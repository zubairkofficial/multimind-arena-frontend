import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import axios from "axios";
import { setUser } from "../../../features/userSlice";
import Helpers from "../../../Config/Helpers";

const ProfileDetailsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Local state to handle form input and image
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNumber: "",
  });
  const [image, setImage] = useState(null); // State for storing image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  // Populate form data when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
      });
      setImagePreview(user.profileImage || null); // Set initial image preview if exists
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle image file change and generate a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Generate preview URL
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const notyf = new Notyf();

    setIsUpdating(true);
    setUpdateError(null);

    // Create FormData object
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("username", formData.username);
    dataToSend.append("phoneNumber", formData.phoneNumber);
    if (image) {
      dataToSend.append("file", image); // Add image file with 'file' key
    }

    try {
      // Send the form data using axios
      const response = await axios.put(
        `${Helpers.apiUrl}user/update`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedUser = response.data.user;

      // Dispatch the updated user to the Redux store
      dispatch(setUser({ user: updatedUser }));

      // Update the user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Notify the user of the success
      notyf.success("Profile updated successfully.");
    } catch (err) {
      setUpdateError(err);
      notyf.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
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
        {/* Full Name Field */}
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

        {/* Username Field */}
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

        {/* Phone Number Field */}
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

        {/* Image Upload Section */}
        <div className="form-group grid-item">
          <label htmlFor="image">Upload Image</label>
          <div className="custom-file-upload">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Arena Preview" />
              </div>
            )}
            <div className="upload-section">
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
                required
              />
              <label htmlFor="image" className="upload-button">
                Choose Image
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Info"}
            </button>
          </div>
        </div>

        {/* Display update error */}
        {updateError && <p className="text-danger">Error: {updateError.message}</p>}
      </form>
    </div>
  );
};

export default ProfileDetailsForm;
