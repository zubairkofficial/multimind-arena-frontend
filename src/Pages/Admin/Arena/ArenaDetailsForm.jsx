import React, { useState, useEffect } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import { useGetAllArenaTypesQuery } from "../../../features/api/arenaApi";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import { useGetAllLlmModelsQuery, } from '../../../features/api/llmModelApi'; 
import Preloader from "../../Landing/Preloader";
import Helpers from "../../../Config/Helpers";
import Slider from "react-slick";
import AIFigureCard from "./AIFigureCard";
import "./../AiFigures/aifigures.css";
import styled from 'styled-components';
import { FaEdit, FaUsers, FaClock, FaImage, FaRobot, FaLayerGroup, FaAlignLeft, FaCloudUploadAlt, FaTrash, FaLock, FaGlobe } from 'react-icons/fa';
import Select from 'react-select'
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

const SelectStyle = styled.select`
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

const PrivacySection = styled(FormSection)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 2rem;
`;

const PrivacyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PrivacyTitle = styled.h4`
  color: #17df14;
  font-size: 1.1rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PrivacyDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
`;

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 56px;
  height: 30px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #17df14;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }

  &:focus + span {
    box-shadow: 0 0 1px #17df14;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const PrivacyStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.isPrivate ? '#17df14' : 'rgba(255, 255, 255, 0.7)'};
`;

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: state.isFocused ? '#17df14' : 'rgba(23, 223, 20, 0.2)',
    borderWidth: '2px',
    borderRadius: '12px',
    minHeight: '50px',
    padding: '4px 8px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(23, 223, 20, 0.15)' : 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#17df14',
      background: 'rgba(255, 255, 255, 0.08)'
    },
    '@media (max-width: 768px)': {
      minHeight: '45px',
      padding: '2px 6px'
    }
  }),
  menu: (base) => ({
    ...base,
    background: 'rgba(26, 26, 26, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(23, 223, 20, 0.2)',
    borderRadius: '12px',
    padding: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    animation: 'slideDown 0.2s ease',
    '@keyframes slideDown': {
      from: { opacity: 0, transform: 'translateY(-10px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    zIndex: 1000
  }),
  menuList: (base) => ({
    ...base,
    padding: '4px',
    '::-webkit-scrollbar': {
      width: '8px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(23, 223, 20, 0.3)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(23, 223, 20, 0.5)'
      }
    }
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected 
      ? 'linear-gradient(135deg, #17df14 0%, #13b510 100%)' 
      : state.isFocused 
        ? 'rgba(23, 223, 20, 0.1)' 
        : 'transparent',
    color: state.isSelected ? '#000' : '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    fontWeight: state.isSelected ? '600' : '400',
    '&:hover': {
      background: state.isSelected 
        ? 'linear-gradient(135deg, #17df14 0%, #13b510 100%)'
        : 'rgba(23, 223, 20, 0.15)'
    },
    '@media (max-width: 768px)': {
      padding: '10px 12px',
      fontSize: '0.9rem'
    }
  }),
  input: (base) => ({
    ...base,
    color: '#fff',
    margin: '0',
    padding: '0',
    fontSize: '0.95rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem'
    }
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.95rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem'
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff',
    fontSize: '0.95rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem'
    }
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'rgba(23, 223, 20, 0.5)',
    padding: '8px',
    transition: 'all 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    '&:hover': {
      color: '#17df14'
    }
  }),
  clearIndicator: (base) => ({
    ...base,
    color: 'rgba(23, 223, 20, 0.5)',
    padding: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#ff4444'
    }
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '4px 8px',
    gap: '8px'
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'rgba(23, 223, 20, 0.2)'
  })
};

const ArenaDetailsForm = ({ arena }) => {
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


  const { data: llmModels, error, isLoading } = useGetAllLlmModelsQuery();
  const notfy=new Notyf()

  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(arena?.image ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: arena?.name ?? "",
    duration: arena?.expiryTime ?? "60",
    arenaTypeId: arena?.arenaType?.id ?? "",
    aiFigureId: arena?.arenaAIFigures ?? [],
    aiFigureRoles: {},
    description: arena?.description ?? "",
    maxParticipants: arena?.maxParticipants ?? 0,
    isPrivate: arena?.arena.isPrivate ?? false,
    arenaModel:arena?.arenaModel?? []
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


  const handleArenaModelChange = (selectedOption) => {
    setFormData({
      ...formData,
      arenaModel: selectedOption ? [{
        value: selectedOption.value,
        label: selectedOption.label
      }] : []
    });
  };
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

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

  const handleToggleChange = () => {
    setFormData({
      ...formData,
      isPrivate: !formData.isPrivate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("arenaTypeId", formData.arenaTypeId);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("maxParticipants", formData.maxParticipants || "0");
      formDataToSend.append("duration", formData.duration || "null");
      formDataToSend.append("isPrivate", formData.isPrivate);

      formData.aiFigureId.forEach((id) => {
        formDataToSend.append("aiFigureId[]", id);
        if (formData.aiFigureRoles[id]) {
          formDataToSend.append(`aiFigureRoles[${id}]`, formData.aiFigureRoles[id]);
        }
      });
      if (formData?.arenaModel && formData?.arenaModel?.length > 0) {
        formDataToSend.append("arenaModel", JSON.stringify(formData.arenaModel));
      }
      if (image) {
        formDataToSend.append("file", image);
      }

      if (arena?.id) {
        await axios.put(`${Helpers.apiUrl}arenas/${arena.id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      
        notfy.success("Arena updated successfully");
      
      } else {
        await axios.post(`${Helpers.apiUrl}arenas`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsSubmitting(false)
       
        notfy.success("Arena created successfully");
      }
      setFormData({
        name:  "",
        duration:  "60",
        arenaTypeId:  "",
        aiFigureId:  [],
        aiFigureRoles: {},
        description:  "",
        maxParticipants: "",
        isPrivate:  false,  
        arenaModel:[]
      })
      setImage(null)
      setImagePreview(null)
      setIsSubmitting(false);
    } catch (error) {
      notfy.error("Failed to submit form. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoadingArenaTypes || isLoadingAIFigures) return <Preloader />;
  if (arenaTypesError) return <div>Error loading arena types: {arenaTypesError.message}</div>;
  if (aiFiguresError) return <div>Error loading AI figures: {aiFiguresError.message}</div>;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
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
        {/* Privacy Toggle Section */}
        <PrivacySection className="full-width">
          <PrivacyInfo>
            <PrivacyTitle>
              <FaLock /> Arena Privacy
            </PrivacyTitle>
            <PrivacyDescription>
              {formData.isPrivate 
                ? "Only invited participants can join this arena"
                : "Anyone can join this arena"}
            </PrivacyDescription>
          </PrivacyInfo>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <PrivacyStatus isPrivate={formData.isPrivate}>
              {formData.isPrivate ? (
                <>
                  <FaLock /> Private
                </>
              ) : (
                <>
                  <FaGlobe /> Public
                </>
              )}
            </PrivacyStatus>
            
            <ToggleContainer>
              <ToggleInput
                type="checkbox"
                checked={formData.isPrivate}
                onChange={handleToggleChange}
              />
              <ToggleSlider />
            </ToggleContainer>
          </div>
        </PrivacySection>

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
            <SelectStyle
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
            </SelectStyle>
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
              <SelectStyle
                value={formData.aiFigureRoles[figureId] || ""}
                onChange={(e) => handleRoleChange(figureId, e.target.value)}
              >
                <option value="">Select Role</option>
                {roles?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </SelectStyle>
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
              min="0"
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

        {/* Image Upload Section */}
        <FormSection>
          <SectionTitle>
            <FaImage /> Arena Image
          </SectionTitle>
          <ImageUploadContainer>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            {!imagePreview ? (
              <Label htmlFor="image">
                <FaCloudUploadAlt size={40} color="#17df14" />
                <div>
                  <strong>Click to upload</strong> or drag and drop
                  <small>PNG, JPG (max. 5MB)</small>
                </div>
              </Label>
            ) : (
              <ImagePreview>
                <img src={imagePreview} alt="Preview" />
                <div className="remove-image" onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}>
                  <FaTrash />
                </div>
              </ImagePreview>
            )}
          </ImageUploadContainer>
        </FormSection>
        <FormSection>
          <SectionTitle>
            <FaRobot /> AI Model
          </SectionTitle>
        <Select
              value={formData?.arenaModel?.length > 0 ? {
                value: formData?.arenaModel[0].value,
                label: formData?.arenaModel[0].label
              } : null}
              onChange={handleArenaModelChange}
              options={llmModels?.map((model) => ({
                value: model.id,
                label: model.name
              }))}
              placeholder="Select AI Model"
              isClearable={false}
              isMulti={false}
              styles={customSelectStyles}
              className="react-select-container"
              classNamePrefix="react-select"
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
