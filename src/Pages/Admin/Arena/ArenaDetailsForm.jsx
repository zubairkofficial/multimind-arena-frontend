import React, { useState } from "react";
import { Notyf } from "notyf"; // For notifications

const ArenaDetailsForm = () => {
  // Local state to handle form input
  const [formData, setFormData] = useState({
    arenaName: "",
    expiryTime: "",
    arenaType: "", // Arena type field remains
    aiFigure: "", // AI figure field remains
    description: "", // Arena description field remains
  });

  // Arena types for dropdown
  const arenaTypes = [
    "Chill Salons",
    "Debate Arena",
    "Game Worlds",
    "Learn Labs",
    "Science Labs",
    "Troll Pit",
    "Dating Playground",
    "Creative Writing Workshops",
    "Time Travel Tours",
    "Ethical Maze",
    "Art Critic's Corner",
  ];

  // AI figures for dropdown
  const aiFigures = [
    "AI Figure 1",
    "AI Figure 2",
    "AI Figure 3",
    "AI Figure 4",
    // Add more AI figures
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the submitted form data
    console.log("Form Data Submitted:", formData);

    // Notify success
    const notyf = new Notyf();
    notyf.success("Arena created successfully.");
  };

  return (
    <div
      className="tab-pane fade active show"
      id="arena"
      role="tabpanel"
      aria-labelledby="arena-tab"
    >
      <form
        onSubmit={handleSubmit}
        className="rbt-profile-row rbt-default-form row row--15"
      >
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="arenaName">Arena Name</label>
            <input
              id="arenaName"
              type="text"
              value={formData.arenaName}
              onChange={handleChange}
              placeholder="Enter Arena Name"
              required
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="expiryTime">Expiry Time</label>
            <input
              id="expiryTime"
              type="datetime-local"
              value={formData.expiryTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="arenaType">Arena Type</label>
            <select
              id="arenaType"
              value={formData.arenaType}
              onChange={handleChange}
              required
            >
              <option value="">Select Arena Type</option>
              {arenaTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <div className="form-group">
            <label htmlFor="aiFigure">Select AI Figure</label>
            <select
              id="aiFigure"
              value={formData.aiFigure}
              onChange={handleChange}
              required
            >
              <option value="">Select AI Figure</option>
              {aiFigures.map((figure) => (
                <option key={figure} value={figure}>
                  {figure}
                </option>
              ))}
            </select>
          </div>
        </div>

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
            <button type="submit" className="btn-default">
              Add Arena
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArenaDetailsForm;
