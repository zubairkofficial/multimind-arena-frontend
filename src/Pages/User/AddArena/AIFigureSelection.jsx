// AIFigureSelection.js
import React from "react";
import Slider from "react-slick";
import AIFigureCard from "./AIFigureCard";

const AIFigureSelection = ({ formData, setFormData, roles }) => {
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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <label>Select AI Figures (max 3)</label>
      <Slider {...sliderSettings}>
        {formData?.aiFigureId?.map((figure) => (
          <AIFigureCard
            key={figure.id}
            figure={figure}
            onSelect={() => handleAIFigureSelect(figure.id)}
            isSelected={formData.aiFigureId.includes(figure.id)}
          />
        ))}
      </Slider>
      {formData.aiFigureId.map((figureId) => (
        <div key={figureId}>
          <label>Assign Role for {figureId}</label>
          <select
            value={formData.aiFigureRoles[figureId] || ""}
            onChange={(e) => handleRoleChange(figureId, e.target.value)}
          >
            <option value="">Select Role</option>
            {roles?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default AIFigureSelection;
