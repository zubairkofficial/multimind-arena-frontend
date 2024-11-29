import React, { useState } from "react";
import { Notyf } from "notyf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Helpers from "../../../Config/Helpers";
import styled from 'styled-components';

const AIFigureDetailsForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    type: "anime", // Default type
  });
  const [image, setImage] = useState(null); // Store the image file
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

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
    const notyf = new Notyf();
    setIsSubmitting(true); // Start loading

    // Prepare FormData payload
    const aiFigure = new FormData();
    aiFigure.append("name", formData.name);
    aiFigure.append("description", formData.description);
    aiFigure.append("prompt", formData.prompt);
    aiFigure.append("type", formData.type);
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

      notyf.success("AI Figure created successfully.");
      setIsSubmitting(false); // End loading
      navigate("/ai-figure-gallery"); // Navigate to gallery

      setFormData({
        name: "",
        description: "",
        prompt: "",
        type: "anime",
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      notyf.error("Failed to create AI Figure.");
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <FormContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <HeaderSection>
          <Title>Add AI Figure</Title>
          <SubTitle>Create a new AI figure with custom properties</SubTitle>
        </HeaderSection>

        <FormGrid>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter AI Figure Name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">Image</Label>
            <ImageUploadContainer>
              {imagePreview && (
                <ImagePreview>
                  <PreviewImg src={imagePreview} alt="AI Figure Preview" />
                </ImagePreview>
              )}
              <UploadSection>
                <FileInput
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <UploadButton htmlFor="image">
                  <i className="fas fa-cloud-upload-alt"></i>
                  Choose Image
                </UploadButton>
              </UploadSection>
            </ImageUploadContainer>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="creative">Creative</option>
              <option value="anime">Anime</option>
              <option value="famous_people">Famous People</option>
              <option value="fictional_character">Fictional Character</option>
            </Select>
          </FormGroup>

          <FormGroup fullWidth>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description for the AI figure"
              rows="2"
              required
            />
          </FormGroup>

          <FormGroup fullWidth>
            <Label htmlFor="prompt">Prompt</Label>
            <TextArea
              id="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Enter prompt for the AI figure"
              rows="4"
              required
            />
          </FormGroup>
        </FormGrid>

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner /> Creating...
              </>
            ) : (
              'Create AI Figure'
            )}
          </SubmitButton>
        </ButtonContainer>
      </FormWrapper>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FormWrapper = styled.form`
  max-width: 1000px;
  margin: 0 auto;
  background: #101010;
  border-radius: 20px;
  border: 1px solid #0a3d0c;
  overflow: hidden;
`;

const HeaderSection = styled.div`
  padding: 2rem;
  background: linear-gradient(145deg, #101010, #0a3d0c);
  border-bottom: 1px solid #0a3d0c;
`;

const Title = styled.h3`
  color: #17df14;
  font-size: 1.8rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'span 1'};
`;

const Label = styled.label`
  display: block;
  color: #17df14;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: #000000;
  border: 2px solid #0a3d0c;
  border-radius: 8px;
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 3px rgba(23, 223, 20, 0.1);
  }
`;

const Select = styled(Input).attrs({ as: 'select' })`
  cursor: pointer;
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: ${props => props.rows * 24}px;
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed #0a3d0c;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const ImagePreview = styled.div`
  margin-bottom: 1rem;
`;

const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
`;

const UploadSection = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #0a3d0c;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #17df14;
    color: #000000;
  }

  i {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #0a3d0c;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #0a3d0c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: #17df14;
    color: #000000;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default AIFigureDetailsForm;
