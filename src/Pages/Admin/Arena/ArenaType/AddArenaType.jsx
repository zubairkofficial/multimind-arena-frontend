import React, { useState } from "react";
import { useAddArenaTypeMutation } from "../../../../features/arenaSlice";
import { Notyf } from "notyf"; // For notifications

const AddArenaType = () => {
  // Local state to handle form input
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
  });

  const [addArenaType] = useAddArenaTypeMutation();
  const notyf = new Notyf();

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
      // Call the addArenaType mutation
      await addArenaType(formData).unwrap();
      notyf.success("Arena Type created successfully.");
      // Clear form after submission
      setFormData({
        name: "",
        description: "",
        prompt: "",
      });
    } catch (error) {
      notyf.error("Failed to create Arena Type. Please try again.");
    }
  };

  return (
    <div className="tab-pane fade active show" id="arena-type" role="tabpanel" aria-labelledby="arena-type-tab">
      <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="name">Arena Type Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Arena Type Name"
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
              placeholder="Enter a description for the arena type"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="prompt">Prompt</label>
            <textarea
              id="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Enter a prompt for the arena type"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="col-12 mt--20">
          <div className="form-group mb--0">
            <button type="submit" className="btn-default">
              Create Arena Type
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddArenaType;
