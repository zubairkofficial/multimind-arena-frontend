import React, { useState } from "react";
import { Notyf } from "notyf"; // For notifications
import { useAddAIFigureMutation } from "../../../features/api/aiFigureApi"; // Import the mutation hook

const AIFigureDetailsForm = () => {
  // Local state to handle form input
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    prompt: "",
  });

  // Redux mutation hook for adding an AI figure
  const [addAIFigure, { isLoading }] = useAddAIFigureMutation();

  // AI roles for dropdown
  const aiRolesOptions = [
    "The Participant / Peer",
    "The Moderator / Referee",
    "The Instructor / Guru",
    "The Antagonist / Devil's Advocate",
    "The Mentor / Life Coach",
    "The Storyteller / Narrator",
    "The Facilitator / Catalyst",
    "The Analyst / Critic",
    "The Roleplayer / Character Actor",
    "The Humorist / Entertainer",
    "The Collaborator / Teammate",
    "The Emotional Support / Empathy Bot",
    "The Fact-Checker / Accuracy Arbiter",
    "The Innovator / Idea Generator",
    "The Synthesizer / Summarizer",
  ];

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
      // Call the mutation to add the AI figure
      await addAIFigure(formData).unwrap();

      // Notify success
      const notyf = new Notyf();
      notyf.success("AI Figure created successfully.");

      // Clear the form after successful submission
      setFormData({
        name: "",
        role: "",
        prompt: "",
      });
    } catch (error) {
      // Notify failure
      const notyf = new Notyf();
      notyf.error("Failed to create AI Figure.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rbt-profile-row rbt-default-form row row--15"
    >
      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter AI Figure Name"
            required
          />
        </div>
      </div>

      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
        <div className="form-group">
          <label htmlFor="role">Assign Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select AI Role</option>
            {aiRolesOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group">
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            value={formData.prompt}
            onChange={handleChange}
            placeholder="Enter prompt for the AI figure"
            rows="4"
            required
          ></textarea>
        </div>
      </div>

      <div className="col-12 mt--20">
        <div className="form-group mb--0">
          <button type="submit" className="btn-default" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add AI Figure"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AIFigureDetailsForm;
