import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  useUpdateArenaTypeMutation,
  useGetArenaTypeByIdQuery 
} from "../../../../features/api/arenaApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notyf } from "notyf";
import styled from "styled-components";
import { FaEdit, FaAlignLeft, FaComments, FaSave, FaTimes } from "react-icons/fa";

// Styled Components
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
  grid-template-columns: 1fr;
  gap: 2rem;
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
`;

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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(23, 223, 20, 0.2);
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &.primary {
    background: #17df14;
    color: #000;
    border: none;

    &:hover {
      background: #15c912;
    }
  }

  &.secondary {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      border-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Arena Type Name is required"),
  description: yup.string().required("Description is required"),
  prompt: yup.string().required("Prompt is required"),
});

const EditArenaType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateArenaType] = useUpdateArenaTypeMutation();
  const { data: arenaType, isLoading } = useGetArenaTypeByIdQuery(id);
  const notyf = new Notyf();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (arenaType) {
      reset({
        name: arenaType.name,
        description: arenaType.description,
        prompt: arenaType.prompt,
      });
    }
  }, [arenaType, reset]);

  const onSubmit = async (data) => {
    try {
      await updateArenaType({ id, updatedArenaType: data }).unwrap();
      notyf.success("Arena Type updated successfully.");
      navigate("/admin/arena-types");
    } catch (error) {
      notyf.error("Failed to update Arena Type. Please try again.");
    }
  };

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <FormContainer>
      <FormGrid onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <h3 className="section-title">
            <FaEdit /> Basic Information
          </h3>
          <FormGroup>
            <Label>
              <FaEdit /> Arena Type Name
            </Label>
            <Input
              {...register("name")}
              placeholder="Enter Arena Type Name"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaAlignLeft /> Description
            </Label>
            <TextArea
              {...register("description")}
              placeholder="Enter description for the arena type"
              rows="3"
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <FaComments /> Prompt
            </Label>
            <TextArea
              {...register("prompt")}
              placeholder="Enter prompt for the arena type"
              rows="5"
            />
            {errors.prompt && <ErrorMessage>{errors.prompt.message}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        <FormSection>
          <ButtonContainer>
            <Button type="submit" className="primary">
              <FaSave /> Update Arena Type
            </Button>
          
          </ButtonContainer>
        </FormSection>
      </FormGrid>
    </FormContainer>
  );
};

export default EditArenaType; 