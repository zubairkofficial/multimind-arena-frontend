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
import styled from 'styled-components';
import { FaEdit, FaUsers, FaClock, FaImage, FaRobot, FaLayerGroup, FaAlignLeft } from 'react-icons/fa';

// Styled Components
const FormWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

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
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(23, 223, 20, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(23, 223, 20, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const SectionTitle = styled.h3`
  color: #17df14;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #17df14;
  margin-bottom: 0.75rem;
  font-weight: 500;

  svg {
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }
`;

const Select = styled.select`
  ${Input}
  cursor: pointer;

  option {
    background: #1a1a1a;
    color: #fff;
    padding: 8px;
  }
`;

const TextArea = styled.textarea`
  ${Input}
  resize: vertical;
  min-height: 120px;
`;

const ImageUploadContainer = styled.div`
  position: relative;
  border: 2px dashed rgba(23, 223, 20, 0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #17df14;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;

  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
  }

  .remove-image {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4444;
    color: white;
    border-radius: 50%;
    padding: 4px;
    cursor: pointer;
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

  &:hover {
    background: #15c912;
  }

  &:disabled {
    background: rgba(23, 223, 20, 0.5);
    cursor: not-allowed;
  }
`;

const ArenaDetailsForm = ({arena}) => {
  console.log("AddArena",arena)
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
  const [imagePreview, setImagePreview] = useState(arena?.image?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name:arena?.name?? "",
    duration: arena?.expiryTime?? "60",
    arenaTypeId: arena?.arenaType?.id??"",
    aiFigureId:arena?.arenaAIFigures ?? [],
    aiFigureRoles:  {},
    description:arena?.description?? "",
    maxParticipants:arena?.maxParticipants?? "",
  });

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
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle image file change and generate a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
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

    setIsSubmitting(true);

    // Calculate expiry time
    const expiryTime = calculateExpiryTime(Number(formData.duration));

    // Create FormData object
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("duration", formData.duration);
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

    // Append the image file if it exists
    if (image) {
      dataToSend.append("file", image);
    }

    try {
      await axios.post(`${Helpers.apiUrl}arenas`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      notyf.success("Arena created successfully.");

      // Navigate to dashboard if necessary
      // navigate("/dashboard");
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
    } catch (err) {
      notyf.error("Failed to create arena. Please try again.");
      setIsSubmitting(false); // End loading
    }
  };

  if (isLoadingArenaTypes || isLoadingAIFigures) return <Preloader />;
  if (arenaTypesError)
    return <div>Error loading arena types: {arenaTypesError.message}</div>;
  if (aiFiguresError)
    return <div>Error loading AI figures: {aiFiguresError.message}</div>;

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

  return (
    <FormWrapper>
      <FormGrid onSubmit={handleSubmit}>
        {/* Basic Info Section */}
        <FormSection>
          <SectionTitle>
            <FaEdit /> Basic Information
          </SectionTitle>
          <FormGroup>
            <Label>
              <FaEdit /> Topic Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Topic"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaLayerGroup /> Arena Type
            </Label>
            <Select
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
            </Select>
          </FormGroup>
        </FormSection>

        {/* AI Figures Section */}
        <FormSection className="full-width">
          <SectionTitle>
            <FaRobot /> AI Figures
          </SectionTitle>
          <Slider {...sliderSettings}>
            {aiFiguresData?.map((figure) => (
              <div key={figure.id}>
                <AIFigureCard
                  figure={figure}
                  onSelect={() => handleAIFigureSelect(figure.id)}
                  isSelected={formData.aiFigureId.includes(figure.id)}
                />
              </div>
            ))}
          </Slider>

          {/* Role Selection */}
          {formData.aiFigureId?.map((figureId) => (
            <FormGroup key={figureId}>
              <Label>
                Role for {aiFiguresData.find((f) => f.id === figureId)?.name}
              </Label>
              <Select
                value={formData.aiFigureRoles[figureId] || ""}
                onChange={(e) => handleRoleChange(figureId, e.target.value)}
              >
                <option value="">Select Role</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </Select>
            </FormGroup>
          ))}
        </FormSection>

        {/* Configuration Section */}
        <FormSection>
          <SectionTitle>
            <FaUsers /> Configuration
          </SectionTitle>
          
          <FormGroup>
            <Label>
              <FaUsers /> Max Participants
            </Label>
            <Input
              id="maxParticipants"
              type="number"
              min="1"
              value={formData.maxParticipants === 0 ? "" : formData.maxParticipants}
              onChange={handleChange}
              placeholder="Enter number (0 for unlimited)"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaClock /> Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.duration === null ? "" : formData.duration}
              onChange={handleChange}
              placeholder="Enter minutes (empty for unlimited)"
            />
          </FormGroup>
        </FormSection>

        {/* Description Section */}
        <FormSection className="full-width">
          <SectionTitle>
            <FaAlignLeft /> Description
          </SectionTitle>
          <TextArea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description of the arena"
            rows="4"
          />
        </FormSection>

        {/* Submit Button */}
        <FormSection className="full-width">
          <SubmitButton type="submit" disabled={isSubmitting}>
            {arena 
              ? (isSubmitting ? "Updating Arena..." : "Update Arena")
              : (isSubmitting ? "Creating Arena..." : "Create Arena")
            }
          </SubmitButton>
        </FormSection>
      </FormGrid>
    </FormWrapper>
  );
};

export default ArenaDetailsForm;
