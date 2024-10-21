import React, { useState } from "react";
import { Notyf } from "notyf";

const PersonaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    emoji: "",
  });
  const [personas, setPersonas] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const notyf = new Notyf();

    // Add new persona to the personas list
    setPersonas([...personas, formData]);
    setFormData({ name: "", description: "", emoji: "" });
    notyf.success("Persona created successfully!");
  };

  return (
    <div
      className="tab-pane fade"
      id="persona"
      role="tabpanel"
      aria-labelledby="persona-tab"
    >
      <form onSubmit={handleSubmit} className="rbt-default-form row row--15">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="name">Persona Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Persona Name"
              required
            />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Persona Description"
              rows="4"
              required
            ></textarea>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="emoji">Emoji</label>
            <input
              id="emoji"
              type="text"
              value={formData.emoji}
              onChange={handleChange}
              placeholder="Enter Emoji"
              required
            />
          </div>
        </div>
        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default btn-small">
              Create Persona
            </button>
          </div>
        </div>
      </form>

      <div className="mt--30">
        <h5>Existing Personas</h5>
        <ul>
          {personas.map((persona, index) => (
            <li key={index}>
              {persona.emoji} {persona.name} - {persona.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonaForm;