import React, { useState } from "react";
import { Notyf } from "notyf"; // For notifications

const ArenaDetailsForm = () => {
  // Local state to handle form input
  const [formData, setFormData] = useState({
    topic: "",
    duration: "",
    arenaType: "",
    aiFigures: [], // Array to store multiple AI figures
    description: "",
    maxParticipants: "",
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
  const aiFiguresList = [
    "AI Figure 1",
    "AI Figure 2",
    "AI Figure 3",
    "AI Figure 4",
    // Add more AI figures
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Handle multiple AI figures selection
    if (id === "aiFigures") {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      if (selectedValues.length <= 3) {
        setFormData({
          ...formData,
          aiFigures: selectedValues,
        });
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
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
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter Topic"
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
            <label htmlFor="aiFigures">Select AI Figures (max 3)</label>
            <select
              id="aiFigures"
              value={formData.aiFigures}
              onChange={handleChange}
              multiple
              required
            >
              {aiFiguresList.map((figure) => (
                <option key={figure} value={figure}>
                  {figure}
                </option>
              ))}
            </select>
            <small className="text-muted">Hold Ctrl (Cmd on Mac) to select multiple options.</small>
          </div>
        </div>

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
              required
            />
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
