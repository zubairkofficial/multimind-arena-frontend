import React, { useState, useEffect } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import { useGetAllArenaTypesQuery } from "../../../features/api/arenaApi";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import { useGetAllLlmModelsQuery } from "../../../features/api/llmModelApi";
import Preloader from "../../Landing/Preloader";
import Helpers from "../../../Config/Helpers";
import Slider from "react-slick";
import AIFigureCard from "./AIFigureCard";
import "./../AiFigures/aifigures.css";
import styled from "styled-components";
import {
  FaEdit,
  FaUsers,
  FaClock,
  FaImage,
  FaRobot,
  FaLayerGroup,
  FaAlignLeft,
  FaCloudUploadAlt,
  FaTrash,
  FaLock,
  FaGlobe,
} from "react-icons/fa";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../../common/customStyle";
import { ModelType } from "../../../common";
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
  border: 1px solid
    ${(props) => (props.error ? "#ff4444" : "rgba(23, 223, 20, 0.2)")};
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

const StyledTextArea = styled.textarea`
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

const ImageUploadContainer = styled.div`
  border: 2px dashed
    ${(props) => (props.isDragging ? "#17df14" : "rgba(23, 223, 20, 0.2)")};
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
    background: rgba(255, 255, 255, 0.05);
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

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
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
  color: ${(props) =>
    props.isPrivate ? "#17df14" : "rgba(255, 255, 255, 0.7)"};
`;

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(255, 255, 255, 0.05)",
    borderColor: state.isFocused ? "#17df14" : "rgba(23, 223, 20, 0.2)",
    borderWidth: "2px",
    borderRadius: "12px",
    minHeight: "50px",
    padding: "4px 8px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(23, 223, 20, 0.15)" : "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#17df14",
      background: "rgba(255, 255, 255, 0.08)",
    },
    "@media (max-width: 768px)": {
      minHeight: "45px",
      padding: "2px 6px",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(26, 26, 26, 0.95)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(23, 223, 20, 0.2)",
    borderRadius: "12px",
    padding: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    animation: "slideDown 0.2s ease",
    "@keyframes slideDown": {
      from: { opacity: 0, transform: "translateY(-10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    zIndex: 1000,
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
    "::-webkit-scrollbar": {
      width: "8px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgba(23, 223, 20, 0.3)",
      borderRadius: "4px",
      "&:hover": {
        background: "rgba(23, 223, 20, 0.5)",
      },
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? "linear-gradient(135deg, #17df14 0%, #13b510 100%)"
      : state.isFocused
      ? "rgba(23, 223, 20, 0.1)"
      : "transparent",
    color: state.isSelected ? "#000" : "#fff",
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "0.95rem",
    fontWeight: state.isSelected ? "600" : "400",
    "&:hover": {
      background: state.isSelected
        ? "linear-gradient(135deg, #17df14 0%, #13b510 100%)"
        : "rgba(23, 223, 20, 0.15)",
    },
    "@media (max-width: 768px)": {
      padding: "10px 12px",
      fontSize: "0.9rem",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
    margin: "0",
    padding: "0",
    fontSize: "0.95rem",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "0.95rem",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    fontSize: "0.95rem",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "rgba(23, 223, 20, 0.5)",
    padding: "8px",
    transition: "all 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    "&:hover": {
      color: "#17df14",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "rgba(23, 223, 20, 0.5)",
    padding: "8px",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#ff4444",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "4px 8px",
    gap: "8px",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "rgba(23, 223, 20, 0.2)",
  }),
};

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
  align-items: center;
  gap: 1rem;
`;

const PreviewButton = styled.button.attrs({ type: 'button' })`
  padding: 0.75rem 1rem;
  background: ${(props) => (props.isDelete ? "#ff4444" : "#17df14")};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.isDelete ? "#ff4444" : "#15c912")};
  }

  &:disabled {
    background: rgba(23, 223, 20, 0.5);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.9rem;
  margin: 0;
`;

const CategoryMenu = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${(props) =>
    props.active ? "#17df14" : "rgba(23, 223, 20, 0.2)"};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active ? "#15c912" : "rgba(23, 223, 20, 0.3)"};
  }
`;

const SliderContainer = styled.div`
  .slick-slider {
    .slick-track {
      display: flex;
      align-items: center;
    }

    .slick-slide {
      height: auto;
    }
  }
`;

const RequiredStar = styled.span`
  color: #ff4444;
  font-size: 0.9rem;
`;

const RoleAssignment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ArenaDetailsForm = ({ arena }) => {
  const arenaData=JSON.parse(arena?.arenaModel[0]??"{}")
  const navigate = useNavigate();
  const notyf = new Notyf();
  const {
    data: llmModels,
    error: llmError,
    isLoading: llmLoading,
  } = useGetAllLlmModelsQuery();

  // Initialize formData
  const [formData, setFormData] = useState(() => {
    // Extract AI figure IDs and roles from arenaAIFigures
    const selectedFigures =
      arena?.arenaAIFigures?.map((figure) => figure.aiFigure.id) || [];
    const figureRoles =
      arena?.arenaAIFigures?.reduce(
        (acc, figure) => ({
          ...acc,
          [figure.aiFigure.id]: figure.figureRole.id,
        }),
        {}
      ) || {};

    return {
      name: arena?.name ?? "",
      duration: arena?.expiryTime ?? "60",
      arenaTypeId: arena?.arenaType?.id ?? "",
      aiFigureId: selectedFigures,
      aiFigureRoles: figureRoles,
      description: arena?.description ?? "",
      maxParticipants: arena?.maxParticipants ?? 0,
      isPrivate: arena?.isPrivate ?? false,
      arenaModel:
        arena?.arenaModel?.length > 0
          ? [
              {
                value: arenaData?.value,
                label: arenaData?.label,
              },
            ]
          : [],
    };
  });

  const defaultModel = llmModels?.find((model) =>
    model.modelType.includes("mini")
  );
  console.log("Default model", defaultModel?.modelType);
  // Log for debugging
  useEffect(() => {
    console.log("Current formData.arenaModel:", formData.arenaModel);
    console.log("Available LLM Models:", llmModels);
  }, [formData.arenaModel, llmModels]);

  console.log("Arena is", arena);
  // Hooks for fetching data
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

  // State hooks
  const [roles, setRoles] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(arena?.image ?? null);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState("All");

  // Effect for fetching roles
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

  // Dynamic categories
  const dynamicCategories = [
    "All",
    ...new Set(aiFiguresData?.map((figure) => figure.type)),
  ];

  // Filtered figures
  const filteredFigures =
    filter === "All"
      ? aiFiguresData
      : aiFiguresData.filter(
          (figure) =>
            figure.type === filter ||
            (figure.tags && figure.tags.includes(filter))
        );

  // Handlers
  const handleArenaModelChange = (selectedOption) => {
    setFormData({
      ...formData,
      arenaModel: selectedOption
        ? [
            {
              value: selectedOption.value,
              label: selectedOption.label,
            },
          ]
        : [],
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    const error = validateField(id, value);
    setErrors({ ...errors, [id]: error });
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
        if (value === "" || isNaN(value) || value < 0) {
          error = "Max participants must be a valid number.";
        }
        break;
      case "duration":
        if (value === "" || isNaN(value)) {
          error = "Duration is required.";
        }
        break;
      case "description":
        if (!value) error = "Description is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAIFigureSelect = (figureId) => {
    if (
      formData.aiFigureId.length >= 3 &&
      !formData.aiFigureId.includes(figureId)
    ) {
      return; // Disable selection if 3 figures are already selected
    }

    const isSelected = formData.aiFigureId.includes(figureId);
    const updatedAIFigureId = isSelected
      ? formData.aiFigureId.filter((id) => id !== figureId)
      : [...formData.aiFigureId, figureId];

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
      isPrivate: !formData?.isPrivate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("arenaTypeId", formData.arenaTypeId);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("maxParticipants", formData.maxParticipants || "0");
      formDataToSend.append("duration", formData.duration || "null");
      formDataToSend.append("isPrivate", formData?.isPrivate);
      formData.aiFigureId.forEach((id) => {
        formDataToSend.append("aiFigureId[]", id);
        if (formData.aiFigureRoles[id]) {
          formDataToSend.append(
            `aiFigureRoles[${id}]`,
            formData.aiFigureRoles[id]
          );
        }
      });
      if (
        (formData?.arenaModel && formData?.arenaModel?.length > 0) ?? {
          value: defaultModel.id,
          label: defaultModel.name,
        }
      ) {
        formDataToSend.append(
          "arenaModel",
          JSON.stringify(formData.arenaModel)
        );
      }
      if (image) {
        formDataToSend.append("file", image);
      }

      if (arena?.id) {
        // PUT request to update
        const response = await axios.put(
          `${Helpers.apiUrl}arenas/${arena.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        notyf.success("Arena updated successfully");
        setIsSubmitting(false);
        navigate("/admin/manage-arenas");
      } else {
        // POST request to create
        await axios.post(`${Helpers.apiUrl}arenas`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsSubmitting(false);
        notyf.success("Arena created successfully");
      }
      setFormData({
        name: "",
        duration: "60",
        arenaTypeId: "",
        aiFigureId: [],
        aiFigureRoles: {},
        description: "",
        maxParticipants: "",
        isPrivate: false,
        arenaModel: [],
      });
      setImage(null);
      setImagePreview(null);
      setIsSubmitting(false);
    } catch (error) {
      notyf.error("Failed to submit form. Please try again.");
      setIsSubmitting(false);
    }
  };
  console.log("Is Submitting", isSubmitting);
  if (isLoadingArenaTypes || isLoadingAIFigures) return <Preloader />;
  if (arenaTypesError)
    return <div>Error loading arena types: {arenaTypesError.message}</div>;
  if (aiFiguresError)
    return <div>Error loading AI figures: {aiFiguresError.message}</div>;

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
    <FormContainer>
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

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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

        {/* Basic Info Section with pre-filled values */}
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
            {errors.arenaTypeId && (
              <ErrorMessage>{errors.arenaTypeId}</ErrorMessage>
            )}
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
            {errors.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
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
              style={{ display: "none" }}
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
                    <PreviewButton
                      type="button"
                      onClick={() => document.getElementById("image").click()}
                    >
                      <FaImage /> Change
                    </PreviewButton>
                    <PreviewButton
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      isDelete
                    >
                      <FaTrash /> Remove
                    </PreviewButton>
                  </PreviewActions>
                </PreviewOverlay>
              </PreviewContainer>
            )}
          </ImageUploadContainer>
          {imageError && <ErrorMessage>{imageError}</ErrorMessage>}
        </FormSection>

        {/* Configuration Section with pre-filled values */}
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
            {errors.maxParticipants && (
              <ErrorMessage>{errors.maxParticipants}</ErrorMessage>
            )}
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
              value={
                formData.arenaModel?.[0] ?? {
                  value: defaultModel?.id,
                  label: defaultModel.name,
                }
              }
              onChange={handleArenaModelChange}
              options={llmModels?.map((model) => ({
                value: model.id,
                label: model.name,
              }))}
              placeholder="Select AI Model"
              isClearable={false}
              isMulti={false}
              styles={customSelectStyles}
              isLoading={llmLoading}
            />
            {errors.arenaModel && (
              <ErrorMessage>{errors.arenaModel}</ErrorMessage>
            )}
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
            {arena
              ? isSubmitting
                ? "Updating Arena..."
                : "Update Arena"
              : isSubmitting
              ? "Creating Arena..."
              : "Create Arena"}
          </SubmitButton>
        </FormSection>
      </FormGrid>
    </FormContainer>
  );
};

export default ArenaDetailsForm;
