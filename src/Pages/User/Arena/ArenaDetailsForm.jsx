import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import { useGetAllArenaTypesQuery } from "../../../features/api/arenaApi";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import Preloader from "../../Landing/Preloader";
import Helpers from "../../../Config/Helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AIFigureCard from "./AIFigureCard";


const ArenaDetailsForm = () => {
  const { data: arenaTypesData, isLoading: isLoadingArenaTypes, error: arenaTypesError } = useGetAllArenaTypesQuery();
  const { data: aiFiguresData, isLoading: isLoadingAIFigures, error: aiFiguresError } = useGetAllAIFiguresQuery();

  const [isScheduled, setIsScheduled] = useState(false); // Toggle for scheduling
  const [image, setImage] = useState(null); // State to store image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    arenaTypeId: "",
    aiFigureId: [],
    description: "",
    maxParticipants: "",
    scheduledTime: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle image file change and generate a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set the preview URL
  };

  // Handle the toggle for scheduling the arena
  const handleToggleSchedule = () => {
    setIsScheduled(!isScheduled);
    setFormData({
      ...formData,
      scheduledTime: "",
    });
  };

  // Handle AI figure card selection
  const handleAIFigureSelect = (figureId) => {
    const isSelected = formData.aiFigureId.includes(figureId);
    const updatedAIFigureId = isSelected
      ? formData.aiFigureId.filter((id) => id !== figureId)
      : formData.aiFigureId.length < 3
      ? [...formData.aiFigureId, figureId]
      : formData.aiFigureId;

    setFormData({
      ...formData,
      aiFigureId: updatedAIFigureId,
    });
  };

  // Calculate the expiry time based on the duration in minutes
  const calculateExpiryTime = (durationInMinutes) => {
    const now = new Date();
    return new Date(now.getTime() + durationInMinutes * 60000).toISOString();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const notyf = new Notyf();

    // Calculate expiry time
    let expiryTime = isScheduled && formData.scheduledTime
      ? new Date(formData.scheduledTime).toISOString()
      : calculateExpiryTime(Number(formData.duration));

    // Create FormData object
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("duration", formData.duration);
    dataToSend.append("arenaTypeId", formData.arenaTypeId);
    formData.aiFigureId.forEach((id) => dataToSend.append("aiFigureId[]", id));
    dataToSend.append("description", formData.description);
    dataToSend.append("maxParticipants", formData.maxParticipants);
    dataToSend.append("expiryTime", expiryTime);
    dataToSend.append("scheduledTime", formData.scheduledTime || "");

    // Append the image file if it exists
    if (image) {
      dataToSend.append("file", image);
    }

    try {
      const response = await axios.post(
        `${Helpers.apiUrl}arenas`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      notyf.success("Arena created successfully.");
      // Clear form data after successful submission
      setFormData({
        name: "",
        duration: "",
        arenaTypeId: "",
        aiFigureId: [],
        description: "",
        maxParticipants: "",
        scheduledTime: "",
      });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      notyf.error("Failed to create arena. Please try again.");
    }
  };

  // Render loading or error states for arena types
  if (isLoadingArenaTypes || isLoadingAIFigures) return <Preloader />;
  if (arenaTypesError) return <div>Error loading arena types: {arenaTypesError.message}</div>;
  if (aiFiguresError) return <div>Error loading AI figures: {aiFiguresError.message}</div>;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="arena-details-form-container">
      <form onSubmit={handleSubmit} className="arena-form grid-container">
        {/* Arena Topic */}
        <div className="form-group grid-item">
          <label htmlFor="name">Topic</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Topic"
            required
          />
        </div>

        {/* Arena Type Dropdown */}
        <div className="form-group grid-item">
          <label htmlFor="arenaTypeId">Arena Type</label>
          <select id="arenaTypeId" value={formData.arenaTypeId} onChange={handleChange} required>
            <option value="">Select Arena Type</option>
            {arenaTypesData.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI Figure Selection Carousel */}
        <div className="form-group grid-item ai-figure-carousel">
          <label htmlFor="aiFigureId">Select AI Figures (max 3)</label>
          <Slider {...sliderSettings}>
            {aiFiguresData.map((figure) => (
              <AIFigureCard
                key={figure.id}
                figure={figure}
                onSelect={() => handleAIFigureSelect(figure.id)}
              />
            ))}
          </Slider>
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

        {/* Remaining Fields */}
        <div className="form-group grid-item">
          <label htmlFor="maxParticipants">Max Participants</label>
          <input
            id="maxParticipants"
            type="number"
            min="1"
            value={formData.maxParticipants}
            onChange={handleChange}
            placeholder="Enter Max Number"
            required
          />
        </div>

        <div className="form-group grid-item">
          <input
            type="checkbox"
            className="form-check-input"
            id="scheduleArena"
            checked={isScheduled}
            onChange={handleToggleSchedule}
          />
          <label className="form-check-label" htmlFor="scheduleArena">
            Schedule Arena
          </label>
        </div>

        {isScheduled ? (
          <div className="form-group grid-item">
            <label htmlFor="scheduledTime">Scheduled Time</label>
            <input
              id="scheduledTime"
              type="datetime-local"
              value={formData.scheduledTime}
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <div className="form-group grid-item">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter Duration"
              required
            />
          </div>
        )}

        {/* Description */}
        <div className="form-group grid-item grid-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description of the arena"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-group grid-item grid-span-2 submit-section">
          <button type="submit" className="btn-default">
            Add Arena
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArenaDetailsForm;
