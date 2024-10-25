import React, { useState } from "react";
import { Notyf } from "notyf";
import { useAddArenaMutation, useGetAllArenaTypesQuery } from "../../../features/api/arenaApi";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import Preloader from "../../Landing/Preloader";
const ArenaDetailsForm = () => {
  const [addArena, { isLoading, isSuccess, isError, error }] = useAddArenaMutation();
  const { data: arenaTypesData, isLoading: isLoadingArenaTypes, error: arenaTypesError } = useGetAllArenaTypesQuery();
  const { data: aiFiguresData, isLoading: isLoadingAIFigures, error: aiFiguresError } = useGetAllAIFiguresQuery();

  const [isScheduled, setIsScheduled] = useState(false); // Toggle for scheduling
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    arenaTypeId: "",
    aiFigureId: [],
    description: "",
    maxParticipants: "",
    scheduledTime: "", // New field for scheduled time
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "aiFigureId") {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      if (selectedValues.length <= 3) {
        setFormData({
          ...formData,
          aiFigureId: selectedValues,
        });
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  // Handle the toggle for scheduling the arena
  const handleToggleSchedule = () => {
    setIsScheduled(!isScheduled);
    setFormData({
      ...formData,
      scheduledTime: "", // Reset the scheduled time if the toggle is turned off
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

    let expiryTime;

    if (isScheduled && formData.scheduledTime) {
      expiryTime = new Date(formData.scheduledTime).toISOString(); // Use the scheduled time as expiry time
    } else {
      expiryTime = calculateExpiryTime(Number(formData.duration));
    }

    const dataToSend = {
      ...formData,
      expiryTime,
    };

    try {
      await addArena(dataToSend).unwrap();
      notyf.success("Arena created successfully.");
    } catch (err) {
      notyf.error("Failed to create arena. Please try again.");
    }
  };

  // Render loading or error states for arena types
  if (isLoadingArenaTypes || isLoadingAIFigures) {
    return <Preloader />;
  }
  if (arenaTypesError) {
    return <div>Error loading arena types: {arenaTypesError.message}</div>;
  }
  if (aiFiguresError) {
    return <div>Error loading AI figures: {aiFiguresError.message}</div>;
  }

  return (
    <div className="tab-pane fade active show" id="arena" role="tabpanel" aria-labelledby="arena-tab">
      <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Topic"
              required
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
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
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="aiFigureId">Select AI Figures (max 3)</label>
            <select id="aiFigureId" value={formData.aiFigureId} onChange={handleChange} multiple required>
              {aiFiguresData.map((figure) => (
                <option key={figure.id} value={figure.id}>
                  {figure.name} - {figure.description}
                </option>
              ))}
            </select>
            <small className="text-muted">Hold Ctrl (Cmd on Mac) to select multiple options.</small>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="maxParticipants">Max Number of Participants</label>
            <input
              id="maxParticipants"
              type="number"
              min="1"
              value={formData.maxParticipants}
              onChange={handleChange}
              placeholder="Enter Max Number of Participants"
              required
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group form-check">
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
        </div>

        {isScheduled ? (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="scheduledTime">Scheduled Time</label>
              <input
                id="scheduledTime"
                type="datetime-local"
                value={formData.scheduledTime}
                onChange={handleChange}
                required={isScheduled}
              />
            </div>
          </div>
        ) : (
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="duration">Duration (in minutes)</label>
              <input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter Duration"
                required={!isScheduled}
              />
            </div>
          </div>
        )}

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="description">Arena Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description of the arena"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default" disabled={isLoading}>
              {isLoading ? "Creating Arena..." : "Add Arena"}
            </button>
          </div>
        </div>

        {isError && <p className="text-danger">Error: {error?.data?.message}</p>}
      </form>
    </div>
  );
};

export default ArenaDetailsForm;
