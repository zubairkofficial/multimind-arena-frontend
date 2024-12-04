import React, { useState } from "react";
import { Notyf } from "notyf";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Helpers from "../../../Config/Helpers";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi"; // Import your mutation hook
import { useGetAllLlmModelsQuery } from "../../../features/api/LlmModelApi"; // Import query hook for LLM Models
import Select from "react-select"; // Import react-select
import styled from 'styled-components';

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
    aiFigure.append("type", formData.type);
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
      <FormHeader>
        <Title>Add AI Figure</Title>
        <PrivacyToggle>
          <ToggleSwitch
            type="checkbox"
            checked={isPrivate}
            onChange={handleToggle}
            id="privacyToggle"
          />
          <ToggleLabel htmlFor="privacyToggle">
            {isPrivate ? "Private" : "Public"}
          </ToggleLabel>
        </PrivacyToggle>
      </FormHeader>

      <Form onSubmit={handleSubmit}>
        <FormGrid>
          {/* Name Input */}
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

          {/* Image Upload */}
          <ImageUploadGroup>
            <Label htmlFor="image">Image</Label>
            <UploadContainer>
              {imagePreview && (
                <ImagePreview src={imagePreview} alt="AI Figure Preview" />
              )}
              <UploadButton>
                <FileInput
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <span>Choose Image</span>
              </UploadButton>
            </UploadContainer>
            {errors.image && <ErrorText>{errors.image}</ErrorText>}
          </ImageUploadGroup>

          {/* Type Selection - Fixed Version */}
          <FormGroup>
            <Label htmlFor="type">Type</Label>
            <StyledSelect
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <StyledOption value="creative">Creative</StyledOption>
              <StyledOption value="anime">Anime</StyledOption>
              <StyledOption value="famous_people">Famous People</StyledOption>
              <StyledOption value="fictional_character">Fictional Character</StyledOption>
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

const PrivacyToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.input`
  position: relative;
  width: 60px;
  height: 30px;
  appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    background: #17df14;
  }

  &:before {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background: white;
    transition: all 0.3s ease;
    transform: ${props => props.checked ? 'translateX(30px)' : 'translateX(0)'};
  }
`;

const ToggleLabel = styled.label`
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
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

const ImageUploadGroup = styled(FormGroup)`
  position: relative;
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #17df14;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(23, 223, 20, 0.1);
  border: 1px dashed #17df14;
  border-radius: 8px;
  color: #17df14;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(23, 223, 20, 0.2);
  }

  span {
    margin-left: 0.5rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ErrorText = styled.span`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
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
