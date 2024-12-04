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
import { customStyles } from "../../../common/customStyle";
import styled from 'styled-components';
import { FaEdit, FaUsers, FaClock, FaImage, FaRobot, FaLayerGroup, FaCloudUploadAlt, FaTrash, FaAlignLeft } from 'react-icons/fa';

// Main container with responsive grid
const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(23, 223, 20, 0.1);
  transition: all 0.3s ease;
  
  .section-title {
    font-size: 1.1rem;
    color: #17df14;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    border-color: rgba(23, 223, 20, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

// Enhanced form elements
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #17df14;
  font-size: 0.9rem;
  font-weight: 500;
  
  svg {
    font-size: 1.2rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.error ? '#ff4444' : 'rgba(23, 223, 20, 0.2)'};
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  
  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#17df14' : 'rgba(23, 223, 20, 0.1)'};
  color: ${props => props.active ? '#000' : '#17df14'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#17df14' : 'rgba(23, 223, 20, 0.2)'};
  }
`;

const SliderContainer = styled.div`
  margin: 2rem 0;
  .slick-track {
    display: flex;
    gap: 1rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #17df14;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #15c912;
    transform: translateY(-2px);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed ${props => props.isDragging ? '#17df14' : 'rgba(23, 223, 20, 0.2)'};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;
  cursor: pointer;
    height: 90%; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  &:hover {
    border-color: #17df14;
    background: rgba(23, 223, 20, 0.05);
  }
`;

const UploadPrompt = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: #17df14;
`;

const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  strong {
    color: #17df14;
  }

  small {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;
  margin: 0 auto;
  
  &:hover .preview-overlay {
    opacity: 1;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const PreviewActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background: ${props => props.isDelete ? 'rgba(255, 69, 58, 0.2)' : 'rgba(23, 223, 20, 0.2)'};
  color: ${props => props.isDelete ? '#ff453a' : '#17df14'};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isDelete ? 'rgba(255, 69, 58, 0.3)' : 'rgba(23, 223, 20, 0.3)'};
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.span`
  color: #ff453a;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

const StyledReactSelect = styled(Select)`
  .select__control {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(23, 223, 20, 0.2);
    border-radius: 8px;
    min-height: 38px;

    &:hover {
      border-color: #17df14;
    }
  }

  .select__menu {
    background: #1a1a1a;
    border: 1px solid rgba(23, 223, 20, 0.2);
  }

  .select__option {
    background: transparent;
    color: #fff;

    &:hover {
      background: rgba(23, 223, 20, 0.1);
    }

    &--is-selected {
      background: #17df14;
      color: #000;
    }
  }

  .select__multi-value {
    background: rgba(23, 223, 20, 0.1);
    border-radius: 4px;

    &__label {
      color: #17df14;
    }

    &__remove:hover {
      background: rgba(255, 0, 0, 0.2);
      color: #ff4444;
    }
  }
`;

const RoleAssignment = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(23, 223, 20, 0.1);
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 8px;
  color: #fff;
  resize: vertical;
  min-height: 100px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }
`;

const RequiredStar = styled.span`
  color: #ff453a;
  font-size: 0.8rem;
  margin-left: 0.2rem;
`;

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
    isPrivate: false,
    arenaModel: []
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
      case "arenaModel":
        if (!value) error = "Please select an AI model";
        break;
      
      case "aiFigureRoles":
        if (formData.aiFigureId.length > 0) {
          const roleErrors = {};
          formData.aiFigureId.forEach(figureId => {
            if (!formData.aiFigureRoles[figureId]) {
              roleErrors[figureId] = "Role selection is required";
            }
          });
          if (Object.keys(roleErrors).length > 0) {
            error = roleErrors;
          }
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

    // Validate all fields
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        formIsValid = false;
      }
    }

    // Special validation for AI Figure roles
    if (formData.aiFigureId.length > 0) {
      const roleErrors = validateField("aiFigureRoles");
      if (roleErrors) {
        newErrors.aiFigureRoles = roleErrors;
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
  
      // Calculate expiry time or set to null if duration is "Unlimited"
      const expiryTime =
        formData.duration === 'null'
          ? null
          : await calculateExpiryTime(Number(formData.duration));
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
      
      // Update how arenaModel is appended
      if (formData.arenaModel && formData.arenaModel.length > 0) {
        dataToSend.append("arenaModel", JSON.stringify(formData.arenaModel));
      }

  
      // Append the image file
      if (image) {
        dataToSend.append("file", image);
      }
  
  
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
        arenaModel: [], // Reset arenaModel
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


 const handleArenaModelChange = (selectedOption) => {
  setFormData({
    ...formData,
    arenaModel: selectedOption ? [{
      value: selectedOption.value,
      label: selectedOption.label
    }] : []
  });
};


  return (
    <FormContainer>
      <FormGrid onSubmit={handleSubmit}>
        {/* Basic Info Section */}
        <FormSection>
          <h3 className="section-title">
            <FaEdit /> Basic Information
          </h3>
          <FormGroup>
            <Label>
              <FaEdit /> Topic Name
            </Label>
            <StyledInput
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Topic"
              error={errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLayerGroup /> Arena Type
            </Label>
            <StyledSelect
              id="arenaTypeId"
              value={formData.arenaTypeId}
              onChange={handleChange}
            >
              <option value="">Select Arena Type</option>
              {arenaTypesData?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </StyledSelect>
            {errors.arenaTypeId && <ErrorMessage>{errors.arenaTypeId}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaAlignLeft /> Description
            </Label>
            <StyledTextArea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter arena description"
              rows="4"
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        {/* Image Upload Section */}
        <FormSection>
          <h3 className="section-title">
            <FaImage /> Arena Image
          </h3>
          <ImageUploadContainer isDragging={false}>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            {!imagePreview ? (
              <UploadPrompt htmlFor="image">
                <FaCloudUploadAlt size={40} />
                <UploadText>
                  <strong>Click to upload</strong> or drag and drop
                  <small>PNG, JPG (max. 5MB)</small>
                </UploadText>
              </UploadPrompt>
            ) : (
              <PreviewContainer>
                <ImagePreview src={imagePreview} alt="Preview" />
                <PreviewOverlay className="preview-overlay">
                  <PreviewActions>
                    <PreviewButton onClick={() => document.getElementById('image').click()}>
                      <FaImage /> Change
                    </PreviewButton>
                    <PreviewButton onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }} isDelete>
                      <FaTrash /> Remove
                    </PreviewButton>
                  </PreviewActions>
                </PreviewOverlay>
              </PreviewContainer>
            )}
          </ImageUploadContainer>
          {imageError && <ErrorMessage>{imageError}</ErrorMessage>}
        </FormSection>

        {/* Configuration Section */}
        <FormSection>
          <h3 className="section-title">
            <FaUsers /> Configuration
          </h3>
          <FormGroup>
            <Label>
              <FaUsers /> Max Participants
            </Label>
            <StyledSelect
              id="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
            >
              <option value="">Select Max Participants</option>
              <option value={2}>2</option>
              <option value={100}>100</option>
              <option value={0}>Unlimited</option>
            </StyledSelect>
            {errors.maxParticipants && <ErrorMessage>{errors.maxParticipants}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaClock /> Duration
            </Label>
            <StyledSelect
              id="duration"
              value={formData.duration}
              onChange={handleChange}
            >
              <option value="">Select Duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="null">Unlimited</option>
            </StyledSelect>
            {errors.duration && <ErrorMessage>{errors.duration}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        {/* AI Model Selection */}
        <FormSection>
          <h3 className="section-title">
            <FaRobot /> AI Model Selection
          </h3>
          <FormGroup>
            <Label>
              <FaRobot /> Choose LLM Model
            </Label>
            <Select
              value={formData.arenaModel.length > 0 ? {
                value: formData.arenaModel[0].value,
                label: formData.arenaModel[0].label
              } : null}
              onChange={handleArenaModelChange}
              options={llmModels?.map((model) => ({
                value: model.id,
                label: model.name
              }))}
              placeholder="Select AI Model"
              isClearable={false}
              isMulti={false}
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(23, 223, 20, 0.2)',
                  borderRadius: '8px',
                  padding: '2px',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#17df14'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  background: '#1a1a1a',
                  border: '1px solid rgba(23, 223, 20, 0.2)',
                  borderRadius: '8px',
                  padding: '4px'
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isSelected ? '#17df14' : 
                              state.isFocused ? 'rgba(23, 223, 20, 0.1)' : 'transparent',
                  color: state.isSelected ? '#000' : '#fff',
                  padding: '8px 12px',
                  '&:hover': {
                    background: 'rgba(23, 223, 20, 0.1)'
                  }
                }),
                multiValue: (base) => ({
                  ...base,
                  background: 'rgba(23, 223, 20, 0.1)',
                  borderRadius: '4px'
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: '#17df14',
                  padding: '4px'
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: '#17df14',
                  '&:hover': {
                    background: 'rgba(255, 0, 0, 0.1)',
                    color: '#ff4444'
                  }
                }),
                input: (base) => ({
                  ...base,
                  color: '#fff'
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'rgba(255, 255, 255, 0.5)'
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#fff'
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: 'rgba(23, 223, 20, 0.5)',
                  '&:hover': {
                    color: '#17df14'
                  }
                }),
                clearIndicator: (base) => ({
                  ...base,
                  color: 'rgba(23, 223, 20, 0.5)',
                  '&:hover': {
                    color: '#17df14'
                  }
                })
              }}
            />
            {errors.arenaModel && <ErrorMessage>{errors.arenaModel}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        {/* AI Figures Section */}
        <FormSection className="full-width">
          <h3 className="section-title">
            <FaRobot /> AI Figures
          </h3>
          <CategoryMenu>
            {dynamicCategories.map((category) => (
              <CategoryButton
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryMenu>

          <SliderContainer>
            <Slider {...sliderSettings}>
              {filteredFigures.map((figure) => (
             
                <AIFigureCard
                  key={figure.id}
                  figure={figure}
                  onSelect={() => handleAIFigureSelect(figure.id)}
                  isSelected={formData.aiFigureId.includes(figure.id)}
                />
              ))}
            </Slider>
          </SliderContainer>

          {/* Role Assignment */}
          {formData.aiFigureId?.map((figureId) => (
            <RoleAssignment key={figureId}>
              <Label>
                Role for {aiFiguresData.find((f) => f.id === figureId)?.name}
                <RequiredStar>*</RequiredStar>
              </Label>
              <StyledSelect
                value={formData.aiFigureRoles[figureId] || ""}
                onChange={(e) => handleRoleChange(figureId, e.target.value)}
                error={errors.aiFigureRoles?.[figureId]}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </StyledSelect>
              {errors.aiFigureRoles?.[figureId] && (
                <ErrorMessage>{errors.aiFigureRoles[figureId]}</ErrorMessage>
              )}
            </RoleAssignment>
          ))}
        </FormSection>

        {/* Submit Button */}
        <FormSection className="full-width">
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner /> Creating Arena...
              </>
            ) : (
              'Create Arena'
            )}
          </SubmitButton>
        </FormSection>
      </FormGrid>
    </FormContainer>
  );
};

export default ArenaDetailsForm;
