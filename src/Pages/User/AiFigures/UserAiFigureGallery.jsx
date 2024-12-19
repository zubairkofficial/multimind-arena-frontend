import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import CustomModal from "./../../../components/Modal/CustomModal";
import { useGetAllAIFiguresQuery } from "../../../features/api/aiFigureApi";
import "./aifigures.css";
import { useLocation } from "react-router-dom";
import Preloader from "../../Landing/Preloader";
import SearchBar from "../../../components/Searchbar/Searchbar";
import { useSelector } from "react-redux";
import { AIFigureStatus, UserTier } from "../../../common";
import {useGetUserByIdQuery } from "../../../features/api/userApi"
import styled from "styled-components";
import _ from "lodash"
import { useGetAllAifigureTypesQuery } from "../../../features/api/aiFigureTypeApi"; // Import the query hook

const AIFigureGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserByIdQuery(user?.id);
 const { data: aiFigureTypes, isLoading: isLoadingTypes, error: typeError } =
    useGetAllAifigureTypesQuery();
  const { data: aiFigures, isLoading, isError, error } = useGetAllAIFiguresQuery();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);

  const [filter, setFilter] = useState("All");

  const [selectedFigure, setSelectedFigure] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dynamicCategories = [...new Set(aiFigureTypes?.map((figure) => figure.name))];
  const categories = ["All", ...dynamicCategories];

  const handleCreateFigure = () => {
    navigate( "/add-ai-figure");
  };

  const handleFigureClick = (figure) => {
    setSelectedFigure(figure);
    setShowModal(true);
  };

  const handleChatNow = () => {
    if (selectedFigure) {
      navigate(`/chat/${selectedFigure.id}`, { state: selectedFigure });
    }
  };

  if (isLoading) {
    return <Preloader aria-live="polite" aria-busy="true" />;
  }

  if (isError) {
    return <div role="alert" aria-live="assertive">Error loading AI figures: {error.message}</div>;
  }

  const filteredFigures =
    filter === "All"
      ? aiFigures
      : aiFigures.filter(
          (figure) =>  figure?.aifigureType?.name === filter || (figure.tags && figure.tags.includes(filter))
        );
  return (
    <GalleryContainer style={{marginLeft: `${!sidebarOpen?"5.5rem":"0rem"}`}}>
      <GalleryHeader>
        <SearchSection>
          <SearchBar
            title="+ AI Figure"
            onClick={handleCreateFigure}
            placeholder="Search AI Figures..."
            aria-labelledby="gallery-heading"
            heading="AI Figure Gallery"
            isPremium={userData?.aiFigureRequestStatus === AIFigureStatus?.APPROVED ? false : userData?.tier === UserTier.FREE}
          />
        </SearchSection>

        <CategoryMenu role="navigation" aria-label="Category Filter">
          {categories?.map((category) => (
            <CategoryButton
              key={category}
              isActive={filter === category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              aria-label={`Filter by ${category}`}
            >
             {_.startCase(_.capitalize( category))}
            </CategoryButton>
          ))}
        </CategoryMenu>
      </GalleryHeader>

      <GalleryGrid
        sidebarOpen={sidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
      >
        {filteredFigures?.map((figure) => (
          <GalleryItem
            key={figure.id}
            sidebarOpen={sidebarOpen}
            rightSidebarOpen={rightSidebarOpen}
          >
            <AIFigureCard
              figure={figure}
              role="gridcell"
              onSelect={() => handleFigureClick(figure)}
            />
          </GalleryItem>
        ))}
      </GalleryGrid>

      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        figure={selectedFigure}
        onChatNow={handleChatNow}
      />
    </GalleryContainer>
  );
};

// Styled Components
const GalleryContainer = styled.div`
  padding: 2rem;
  background: #000000;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
  background: #101010;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #0a3d0c;
`;

const CategoryMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #101010;
  border-radius: 12px;
  border: 1px solid #0a3d0c;

  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.isActive ? '#0a3d0c' : 'transparent'};
  color: ${props => props.isActive ? '#ffffff' : '#17df14'};
  border: 2px solid #0a3d0c;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: capitalize;

  &:hover {
    background: #0a3d0c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  @media (max-width: 576px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => {
     return 'repeat(3, 1fr)';
  }};
  gap: 2rem;
  padding: 1rem;
  background: #101010;
  border-radius: 12px;
  border: 1px solid #0a3d0c;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GalleryItem = styled.div`
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  /* Add animation for new items */
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default AIFigureGallery;
