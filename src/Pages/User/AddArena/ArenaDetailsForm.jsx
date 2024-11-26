import React, { useState, useEffect } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import { useGetAllArenaTypesQuery } from "../../../features/api/arenaApi";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import Preloader from "../../Landing/Preloader";
import Helpers from "../../../Config/Helpers";
import Slider from "react-slick";
import AIFigureCard from "./AIFigureCard";
import "./../AiFigures/aifigures.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Select from "react-select"; // Import Select from react-select

const ArenaDetailsForm = ({isPrivate,llmModels}) => {
  const navigate = useNavigate();
  // Arena and AI figure queries
  const {
    data: arenaTypesData,
    isLoading: isLoadingArenaTypes,
    error: arenaTypesError,
  } = useGetAllArenaTypesQuery();
  const {
    data: aiFiguresData,
    isLoading: isLoadingAIFigures,
    error: aiFiguresError,
  } = useGetAllAIFiguresQuery();

  // Form data state
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    duration: null,
    arenaTypeId: "",
    aiFigureId: [],
    aiFigureRoles: {},
    description: "",
    maxParticipants: "",
    isPrivate:false,
    arenaModel:[]
  });

  // Filter state
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}figure-role`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Handle special case for "Unlimited" and "null" values for duration
    if (id === "duration") {
      setFormData({
        ...formData,
        [id]: value === "Unlimited" ? null : parseInt(value, 10),
      });
    }
    
    // Handle "maxParticipants" as a number (parse the value)
    if (id === "maxParticipants") {
      setFormData({
        ...formData,
        [id]: value === "" ? "" : parseInt(value, 10), // Parse as number, or empty string if no value
      });
    } else {
      // For other fields, just store the value
      setFormData({
        ...formData,
        [id]: value === "Unlimited" ? null : value,
      });
    }
  
    const error = validateField(id, value);
    setErrors({ ...errors, [id]: error });
  };
  
  
  // Handle image file change and generate a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageError("");
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value) error = "Topic name is required.";
        break;
      case "arenaTypeId":
        if (!value) error = "Arena type is required.";
        break;
      case "maxParticipants":
        // Allow "0" as a valid number of participants and ensure it is a valid number
        if (value === "" || value === null || isNaN(value) || value < 0) {
          error = "Max participants are required and must be valid.";
        }
        break;
      case "duration":
        console.log("unlimited",value)
        // Null is valid for duration; ensure it is either null or a valid number
        if (value === null || isNaN(value)) {
      if(value==="null")return
          error = "Duration is required.";
        }
        break;
      case "description":
        if (!value) error = "Description is required.";
        break;
      case "image":
        if (!value) error = "Image is required.";
        else if (value && !["image/jpeg", "image/png"].includes(value.type)) {
          error = "Only JPEG and PNG images are allowed.";
        }
        break;
      default:
        break;
    }
    return error;
  };
  
  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    }
    setErrors(newErrors);
    return formIsValid;
  };


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
      aiFigureRoles: isSelected
        ? { ...formData.aiFigureRoles, [figureId]: undefined }
        : formData.aiFigureRoles,
    });
  };

  const handleRoleChange = (figureId, roleId) => {
    setFormData({
      ...formData,
      aiFigureRoles: {
        ...formData.aiFigureRoles,
        [figureId]: roleId,
      },
    });
  };

  const calculateExpiryTime = (durationInMinutes) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + durationInMinutes * 60000);

    // Convert expiryTime to UTC (Z) and format as ISO string
    const utcTimeString = expiryTime.toISOString(); // This will give you the ISO string in UTC

    return utcTimeString; // Returns the expiration time in UTC (Z) format
};


  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const notyf = new Notyf();
  
    // Validate the form
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
  
    // Check if the image is uploaded
    if (!image) {
      setImageError("Image is required");
      return; // Stop submission if the image is missing
    }
  
    setIsSubmitting(true); // Set the submission state only after validation passes
  
    try {
      console.log("formData.duration", formData.duration);
  
      // Calculate expiry time or set to null if duration is "Unlimited"
      const expiryTime =
        formData.duration === 'null'
          ? null
          : await calculateExpiryTime(Number(formData.duration));
  console.log("expiryTime",expiryTime,formData.arenaModel)
      // Create FormData object
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("arenaTypeId", formData.arenaTypeId);
      formData.aiFigureId.forEach((id) => {
        dataToSend.append("aiFigureId[]", id);
        if (formData.aiFigureRoles[id]) {
          dataToSend.append(`aiFigureRoles[${id}]`, formData.aiFigureRoles[id]);
        }
      });
      dataToSend.append("description", formData.description);
      dataToSend.append("maxParticipants", formData.maxParticipants);
      dataToSend.append("expiryTime", expiryTime);
      dataToSend.append("isPrivate", isPrivate??false);
      dataToSend.append("arenaModel", JSON.stringify(formData.arenaModel));

  
      // Append the image file
      if (image) {
        dataToSend.append("file", image);
      }
  
      console.log("dataToSend", dataToSend);
  
      // Submit the form
      await axios.post(`${Helpers.apiUrl}arenas`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Show success notification
      notyf.success("Arena created successfully.");
      setIsSubmitting(false);
  
      // Clear form data after successful submission
      setFormData({
        name: "",
        duration: "",
        arenaTypeId: "",
        aiFigureId: [],
        aiFigureRoles: {},
        description: "",
        maxParticipants: "",
      });
      setImage(null);
      setImagePreview(null);
      navigate("/dashboard");
    } catch (err) {
      // Show error notification
      notyf.error("Failed to create arena. Please try again.");
      setIsSubmitting(false); // End loading state on error
    }
  };
  ;

  if (isLoadingArenaTypes || isLoadingAIFigures) return <Preloader />;
  if (arenaTypesError)
    return <div>Error loading arena types: {arenaTypesError.message}</div>;
  if (aiFiguresError)
    return <div>Error loading AI figures: {aiFiguresError.message}</div>;

  // Dynamically generate categories for filtering
  const dynamicCategories = [
    "All",
    ...new Set(aiFiguresData?.map((figure) => figure.type)),
  ];

  const filteredFigures =
    filter === "All"
      ? aiFiguresData
      : aiFiguresData.filter(
          (figure) =>
            figure.type === filter ||
            (figure.tags && figure.tags.includes(filter))
        );
        const customStyles = {
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "#101010", // Dark background for the control
            borderColor: state.isFocused || state.menuIsOpen ? "#4caf50" : "#333333", // Green border when clicked (focus) or dropdown is open
            boxShadow:
              state.isFocused || state.menuIsOpen ? "0 0 0 2px #4caf50" : "none", // Optional: add green outline on focus
            color: "white", // Text color for the control
            minHeight: "36px",
            "&:hover": {
              borderColor: "#4caf50", // Ensures the border is black on hover as well
            },
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#101010", // Background color for the dropdown menu
            color: "white", // Text color for the dropdown menu featureNames
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#333333" : "#101010", // Dark background for featureNames
            color: state.isSelected ? "white" : "#bbb", // Text color for selected and non-selected featureNames
            borderColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#222222", // Hover effect color
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#4caf50", // Background color for selected values
            color: "white", // Text color for selected values
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "white", // Text color for selected value label
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "white", // Color for the remove button
            "&:hover": {
              backgroundColor: "#4caf50", // Hover color for remove button
            },
          }),
        };
        
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // Larger tablets and small laptops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens (like mobile devices)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


 const handleArenaModelChange = (selectedOptions) => {
  setFormData({
    ...formData,
    arenaModel: selectedOptions.map((opt) => {
      // Parse stringified JSON if needed
      const parsedOpt = typeof opt === 'string' ? JSON.parse(opt) : opt;

      return {
        value: parsedOpt.value,
        label: parsedOpt.label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // Format label
      };
    }),
  });
};


  return (
    <div
      className="arena-details-form-container fs-6 font-bold"
      style={{ padding: "2rem", margin: "0 auto", maxWidth: "800px" }}
    >
      <form onSubmit={handleSubmit} className="arena-form grid-container mb-5">
        {/* Arena Topic */}
        <div
          className="form-group grid-item "
          style={{ display: "inline-block", width: "48%", marginRight: "2%" }}
        >
          <label htmlFor="name">Topic</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Topic"
            
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Arena Type */}
        <div
          className="form-group grid-item"
          style={{ display: "inline-block", width: "48%" }}
        >
          <label htmlFor="arenaTypeId">Arena Type</label>
          <select
            id="arenaTypeId"
            value={formData.arenaTypeId}
            onChange={handleChange}
            
          >
            <option value="">Select Arena Type</option>
            {arenaTypesData.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.arenaTypeId && <span className="error-text">{errors.arenaTypeId}</span>}
        </div>

        {/* AI Figure Selection */}
        <label htmlFor="aiFigureId">Select AI Figures (max 3)</label>
        <div
          className="category-menu  mb-3"
          role="navigation"
          aria-label="Category Filter"
        >
          {dynamicCategories.map((category) => (
            <button
              key={category}
              className={`category-btn ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
    
        </div>

        {/* AI Figure Selection */}
        <div style={{ marginBottom: "2rem" }}>
          <div>
            <Slider {...sliderSettings}>
              {filteredFigures.map((figure) => (
                <div key={figure.id} className="slider-item">
                  <AIFigureCard
                    figure={figure}
                    onSelect={() => handleAIFigureSelect(figure.id)}
                    isSelected={formData.aiFigureId.includes(figure.id)}
                  />
                </div>
              ))}
            </Slider>
          </div>
          {formData.aiFigureId?.map((figureId) => (
            <div
              key={figureId}
              style={{
                marginTop: "0.5rem",
                display: "grid",
                gridTemplateColumns: "1fr",
                gridGap: "0.5rem",
              }}
            >
              <label>
                Assign Role for{" "}
                {aiFiguresData.find((f) => f.id === figureId)?.name}
              </label>
              <select
                value={formData.aiFigureRoles[figureId] || ""}
                onChange={(e) => handleRoleChange(figureId, e.target.value)}
                
                style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Image Upload Section */}
        <div
          className="form-group grid-item"
          style={{ width: "48%", display: "inline-block", marginRight: "2%" }}
        >
          <label htmlFor="image">Upload Image</label>
          <div className="custom-file-upload">
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Arena Preview"
                  style={{ width: "100px", height: "100px" }}
                />
            {errors.image && <span className="error-text">{errors.image}</span>}
              </div>
              
            )}
            <div className="upload-section">
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }} // Hide default file input styling
              />
              <label htmlFor="image" className="upload-button">
                Choose Image
              </label>
            </div>
            {imageError && <p className="text-danger">{imageError}</p>}
        
          </div>
        </div>

        {/* Max Participants */}
        <div
          className="form-group grid-item"
          style={{ width: "48%", display: "inline-block" }}
        >
          <label htmlFor="maxParticipants">Max Participants</label>
          <select
            id="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            
          >
            <option value="">Select Max Participants</option>
            <option value={2}>2</option>
            <option value={100}>100</option>
            <option value={0}>Unlimited</option>
          </select>
          {errors.maxParticipants && <span className="error-text">{errors.maxParticipants}</span>}
      
        </div>

        {/* Max Duration */}
        <div
  className="form-group grid-item"
  style={{
    width: "48%",
    display: "inline-block",
    marginTop: "1rem",
    fontSize: "12px",  // Adjusted font size
  }}
>
  <label htmlFor="duration" style={{ fontSize: "14px" }}>Duration (minutes)</label>
  <select
    id="duration"
    value={formData.duration}
    onChange={handleChange}
    style={{ fontSize: "12px" }}  // Adjusted font size for select dropdown
  >
    <option value="">Select Duration</option>
    <option value="15">15 minutes</option>
    <option value="30">30 minutes</option>
    <option value="60">60 minutes</option>
    <option value="90">90 minutes</option>
    <option value="null">Unlimited</option>
  </select>
  {errors.duration && <span className="error-text" style={{ fontSize: "12px" }}>{errors.duration}</span>} {/* Adjust error text font size */}
</div>


        {/* Description */}
        <div
          className="form-group grid-item grid-span-2"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description of the arena"
            rows="4"
            
          ></textarea>
           {errors.description && <span className="error-text">{errors.description}</span>}
      
        </div>
        <div className="form-group mb-3">
        <label>Choose LLM Model</label>
        <Select
          isMulti
          options={llmModels?.map((model) => ({
            value: model.id,
            label: model.name,
          }))}
          styles={customStyles}
          placeholder="Select LLM Model"
          onChange={handleArenaModelChange}
        />
      </div>
        {/* Submit Button */}
        <div
          className="form-group grid-item grid-span-2 submit-section"
          style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
        >
          <button type="submit" className="btn-default" disabled={isSubmitting}>
            {isSubmitting ? "Creating Arena..." : "Add Arena"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArenaDetailsForm;
