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
    <>
    <h3>Create New Arena Type</h3>
    <div className="tab-pane fade active show" id="arena-type" role="tabpanel" aria-labelledby="arena-type-tab">
      <form onSubmit={handleSubmit} className="rbt-profile-row rbt-default-form row row--15">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Arena Type Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Arena Type Name"
              required
            />
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className=""
              placeholder="Enter a description for the arena type"
              rows="2"
              required
            ></textarea>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label htmlFor="prompt" className="form-label">Prompt</label>
            <textarea
              id="prompt"
              value={formData.prompt}
              onChange={handleChange}
              className=""
              placeholder="Enter a prompt for the arena type"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="form-group mb-0 text-center">
            <button type="submit" className="btn-default btn-lg">
              Create Arena Type
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddArenaType;
