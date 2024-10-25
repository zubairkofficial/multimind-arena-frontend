import React, { useState } from "react";
import { Notyf } from "notyf";
import axios from "axios";
import Helpers from "../../../Config/Helpers";

const AIFigureDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    type: "anime", // Default type
  });
  const [image, setImage] = useState(null); // Store the image file
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData payload
    const aiFigure = new FormData();
    aiFigure.append("name", formData.name);
    aiFigure.append("description", formData.description);
    aiFigure.append("prompt", formData.prompt);
    aiFigure.append("type", formData.type);
    if (image) {
      aiFigure.append("file", image);
    }
    console.log("first", aiFigure);
    try {
      // Send the FormData payload to the server using Axios
      const response = await axios.post(
        `${Helpers.apiUrl}ai-figures`,
        aiFigure,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const notyf = new Notyf();
      notyf.success("AI Figure created successfully.");

      setFormData({
        name: "",
        description: "",
        prompt: "",
        type: "anime",
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
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
          <label htmlFor="image">Image</label>
          <div className="custom-file-upload">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="AI Figure Preview" />
              </div>
            )}
            <div className="upload-section">
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="image" className="upload-button">
                Choose Image
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="creative">Creative</option>
            <option value="anime">Anime</option>
            <option value="famous_people">Famous People</option>
            <option value="fictional_character">Fictional Character</option>
          </select>
        </div>
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description for the AI figure"
            rows="2"
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
            placeholder="Enter prompt for the AI figure"
            rows="4"
            required
          ></textarea>
        </div>
      </div>

      <div className="col-12 mt--20">
        <div className="form-group mb--0">
          <button type="submit" className="btn-default">
            Add AI Figure
          </button>
        </div>
      </div>
    </form>
  );
};

export default AIFigureDetailsForm;
