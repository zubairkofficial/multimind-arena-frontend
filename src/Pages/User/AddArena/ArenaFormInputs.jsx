// ArenaFormInputs.js
import React from "react";

const ArenaFormInputs = ({ formData, handleChange, handleImageChange, imagePreview, roles }) => {
  return (
    <>
      {/* Topic */}
      <div className="form-group grid-item" style={{ display: "inline-block", width: "48%", marginRight: "2%" }}>
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

      {/* Arena Type */}
      <div className="form-group grid-item" style={{ display: "inline-block", width: "48%" }}>
        <label htmlFor="arenaTypeId">Arena Type</label>
        <select
          id="arenaTypeId"
          value={formData.arenaTypeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Arena Type</option>
          {/* Options should be rendered here */}
        </select>
      </div>

      {/* Max Participants */}
      <div className="form-group grid-item" style={{ width: "48%", display: "inline-block", marginTop: "1rem" }}>
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

      {/* Duration */}
      <div className="form-group grid-item" style={{ width: "48%", display: "inline-block", marginTop: "1rem" }}>
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

      {/* Image Upload */}
      <div className="form-group grid-item" style={{ width: "48%", display: "inline-block" }}>
        <label htmlFor="image">Upload Image</label>
        <input id="image" type="file" onChange={handleImageChange} accept="image/*" />
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />}
      </div>

      {/* Description */}
      <div className="form-group grid-item" style={{ width: "100%", marginTop: "1rem" }}>
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
    </>
  );
};

export default ArenaFormInputs;
