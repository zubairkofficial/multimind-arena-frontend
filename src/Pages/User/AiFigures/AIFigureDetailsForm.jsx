import React, { useState } from "react";
import { Notyf } from "notyf";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Helpers from "../../../Config/Helpers";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi"; // Import your mutation hook
import { useGetAllLlmModelsQuery } from "../../../features/api/LlmModelApi"; // Import query hook for LLM Models
import { useGetAllAifigureTypesQuery } from "../../../features/api/aiFigureTypeApi"; // Import the query hook
import Select from "react-select"; // Import react-select
import styled from 'styled-components';
import {  FaGlobe,FaLock,FaCloudUploadAlt,FaImage,FaTrash    } from 'react-icons/fa';

const AIFigureDetailsForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    type: "anime", // Default type
    isAiPrivate: false,
    llmModel: [], // Will store array of objects [{id, name}]
  });

  const [image, setImage] = useState(null); // Store the image file
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [isPrivate, setIsPrivate] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    prompt: "",
    image: "",
    llmModel: "",
  });

  const { data: llmModels, error, isLoading } = useGetAllLlmModelsQuery(); // Fetch LLM models
  const { refetch } = useGetAllAIFiguresQuery(); // Hook for refetching AI figures
  const { data: aiFigureTypes, isLoading: isLoadingTypes, error: typeError } =
    useGetAllAifigureTypesQuery();
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "llmModel") {
      // Handle multiple selections
      const selectedModels = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        [id]: selectedModels,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const fileType = file.type;
      const validTypes = ["image/jpeg", "image/png"];

      if (!validTypes.includes(fileType)) {
        alert("Please upload a PNG or JPEG image.");
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleAIFigureModelChange = (selectedOption) => {
    setFormData({
      ...formData,
      llmModel: selectedOption ? [{
        id: selectedOption.value,
        name: selectedOption.label
      }] : []
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.prompt) newErrors.prompt = "Prompt is required.";
    if (!image) newErrors.image = "Image is required.";
    if (!formData.llmModel || formData.llmModel.length === 0) {
      newErrors.llmModel = "LLM model is required.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notyf = new Notyf();
    setIsSubmitting(true);

    if (!validateFields()) {
      setIsSubmitting(false);
      return;
    }

    const aiFigure = new FormData();
    aiFigure.append("name", formData.name);
    aiFigure.append("description", formData.description);
    aiFigure.append("prompt", formData.prompt);
    aiFigure.append("aifigureType", formData.type);
    aiFigure.append("isAiPrivate", isPrivate);
    
    if (formData.llmModel && formData.llmModel.length > 0) {
      aiFigure.append("llmModel", JSON.stringify(formData.llmModel));
    }

    if (image) {
      aiFigure.append("file", image);
    }


    try {
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

      if (response.status === 201) {
        notyf.success("AI Figure created successfully.");
        setIsSubmitting(false);
        navigate("/ai-figure-gallery");
        refetch();

        setFormData({
          name: "",
          description: "",
          prompt: "",
          type: "anime",
          llmModel: [],
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      notyf.error("Failed to create AI Figure.");
      setIsSubmitting(false);
    }
  };

  const handleToggle = () => {
    setIsPrivate((prevState) => !prevState);
  };

  return (
    <FormContainer>
      <HeaderSection>
        <TitleWrapper>
          <PageTitle>+ Add AI Figure</PageTitle>
          <SubTitle>Create your custom AI figure with advanced capabilities</SubTitle>
        </TitleWrapper>
        
        <ToggleWrapper>
          <ToggleLabel>
            <VisibilityText>AI Figure Visibility</VisibilityText>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={isPrivate}
                onChange={handleToggle}
              />
              <ToggleSlider isPrivate={isPrivate}>
                <ToggleIcon isPrivate={isPrivate}>
                  {isPrivate ? <FaLock /> : <FaGlobe />}
                </ToggleIcon>
                <ToggleText isPrivate={isPrivate}>
                  {isPrivate ? 'Private' : 'Public'}
                </ToggleText>
              </ToggleSlider>
            </ToggleSwitch>
          </ToggleLabel>
        </ToggleWrapper>
      </HeaderSection>

      <Form onSubmit={handleSubmit}>
        <FormGrid>
          {/* Name Input */}
            <FormSection>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter AI Figure Name"
              error={errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>
        
          <FormGroup>
          <Label htmlFor="name">Image</Label>
         
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
                   </FormGroup>
                   </FormSection>
          {/* Type Selection - Fixed Version */}
          <FormSection>
          <FormGroup>
            <Label htmlFor="type">Type</Label>
            <StyledSelect
                id="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select a type</option>
                {aiFigureTypes?.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </StyledSelect>
            <SelectArrow>
              <i className="fas fa-chevron-down" />
            </SelectArrow>
          </FormGroup>

          {/* LLM Model Selection - Single Select Version */}
          <FormGroup>
            <Label htmlFor="llmModel">Choose LLM Model</Label>
            <SingleSelect
              options={llmModels?.map((model) => ({
                value: model.id,
                label: model.name,
              }))}
              styles={customSelectStyles}
              placeholder="Select LLM Model"
              onChange={handleAIFigureModelChange}
              value={formData.llmModel.length > 0 ? {
                value: formData.llmModel[0].id,
                label: formData.llmModel[0].name
              } : null}
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable={false}
            />
            {errors.llmModel && <ErrorText>{errors.llmModel}</ErrorText>}
          </FormGroup>
          </FormSection>
          {/* Description */}
          <FormGroup fullWidth>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="5"
              error={errors.description}
            />
            {errors.description && <ErrorText>{errors.description}</ErrorText>}
          </FormGroup>

          {/* Prompt */}
          <FormGroup fullWidth>
            <Label htmlFor="prompt">Prompt</Label>
            <TextArea
              id="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Enter prompt"
              rows="5"
              error={errors.prompt}
            />
            {errors.prompt && <ErrorText>{errors.prompt}</ErrorText>}
          </FormGroup>
        </FormGrid>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner /> Submitting...
            </>
          ) : (
            "Create AI Figure"
          )}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

// Updated Styled Components
const FormContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(16, 16, 16, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(23, 223, 20, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(23, 223, 20, 0.2);
`;

const Title = styled.h3`
  color: #17df14;
  font-size: 1.5rem;
  margin: 0;
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


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 300px;
  margin: 2rem auto 0;
  padding: 1rem 2rem;
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 223, 20, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: #17df14;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.error ? '#ff4444' : 'rgba(23, 223, 20, 0.2)'};
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.error ? '#ff4444' : 'rgba(23, 223, 20, 0.2)'};
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;



const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #17df14;
`;


const ErrorText = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;



const StyledSelect = styled.select`
  width: 100%;
  height:60%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  appearance: none;
  position: relative;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }

  option {
    background: #1a1a1a;
    color: white;
    padding: 10px;
  }
`;

const StyledOption = styled.option`
  padding: 10px;
  background: #1a1a1a;
  color: white;

  &:hover {
    background: rgba(23, 223, 20, 0.1);
  }
`;

const SingleSelect = styled(Select)`
  .react-select__control {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(23, 223, 20, 0.2);
    border-radius: 8px;
    box-shadow: none;
    min-height: 45px;
    
    &:hover {
      border-color: #17df14;
    }
    
    &--is-focused {
      border-color: #17df14;
      box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
    }
  }

  .react-select__menu {
    background: #1a1a1a;
    border: 1px solid rgba(23, 223, 20, 0.2);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    margin-top: 4px;
  }

  .react-select__option {
    padding: 12px 16px;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(23, 223, 20, 0.1);
    }

    &--is-selected {
      background: #17df14;
      color: black;
      font-weight: 500;
    }

    &--is-focused {
      background: rgba(23, 223, 20, 0.1);
    }
  }

  .react-select__single-value {
    color: white;
  }

  .react-select__placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .react-select__input-container {
    color: white;
  }

  .react-select__value-container {
    padding: 2px 12px;
  }

  .react-select__indicator-separator {
    background-color: rgba(23, 223, 20, 0.2);
  }

  .react-select__dropdown-indicator {
    color: rgba(23, 223, 20, 0.5);
    
    &:hover {
      color: #17df14;
    }
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
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

const HeaderSection = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(16, 16, 16, 0.95), rgba(10, 61, 12, 0.3));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid rgba(23, 223, 20, 0.1);
`;

const TitleWrapper = styled.div`
  flex: 1;
`;

const PageTitle = styled.h1`
  color: #17df14;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 1.1rem;
`;

const ToggleWrapper = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(23, 223, 20, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const VisibilityText = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
`;

const ToggleLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isPrivate ? 
    'linear-gradient(145deg, #0a3d0c, #17df14)' : 
    'linear-gradient(145deg, #101010, #1a1a1a)'};
  transition: all 0.4s ease;
  border-radius: 20px;
  border: 2px solid ${props => props.isPrivate ? '#17df14' : '#0a3d0c'};
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
`;

const ToggleIcon = styled.div`
  position: absolute;
  height: calc(100% - 8px);
  aspect-ratio: 1;
  left: ${props => props.isPrivate ? 'calc(100% - 36px)' : '4px'};
  bottom: 4px;
  background: ${props => props.isPrivate ? '#17df14' : '#0a3d0c'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: all 0.4s ease;
`;

const ToggleText = styled.span`
  color: white;
  margin-left: ${props => props.isPrivate ? '1rem' : '3rem'};
  font-weight: 500;
  transition: all 0.4s ease;
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
const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Updated customSelectStyles for single select
const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: state.isFocused ? '#17df14' : 'rgba(23, 223, 20, 0.2)',
    borderRadius: '8px',
    minHeight: '45px',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(23, 223, 20, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#17df14'
    }
  }),
  menu: (base) => ({
    ...base,
    background: '#1a1a1a',
    border: '1px solid rgba(23, 223, 20, 0.2)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    marginTop: '4px'
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? '#17df14' : 
                state.isFocused ? 'rgba(23, 223, 20, 0.1)' : 'transparent',
    color: state.isSelected ? '#000' : '#fff',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: 'rgba(23, 223, 20, 0.1)',
    }
  }),
  input: (base) => ({
    ...base,
    color: '#fff'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff'
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgba(255, 255, 255, 0.5)'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'rgba(23, 223, 20, 0.5)',
    '&:hover': {
      color: '#17df14'
    }
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: 'rgba(23, 223, 20, 0.2)'
  })
};


export default AIFigureDetailsForm;
