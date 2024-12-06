import React from "react";
import { useNavigate } from "react-router-dom";
import AIFigureCard from "./AIFigureCard";
import styled from "styled-components";

// Dummy data for AI Figures
const aiFigures = [
  {
    name: "AI Mentor",
    emoji: "🧙‍♂️",
    role: "The Mentor / Life Coach",
  },
  {
    name: "AI Critic",
    emoji: "🧐",
    role: "The Analyst / Critic",
  },
  {
    name: "AI Entertainer",
    emoji: "🎭",
    role: "The Humorist / Entertainer",
  },
  // Add more dummy data here
];

const AIFigureGallery = () => {
  const navigate = useNavigate();

  const handleCreateFigure = () => {
    navigate("/admin/add-ai-figure");
  };

  return (
    <GalleryContainer>
      <GalleryWrapper>
        <Header>
          <HeaderContent>
            <Title>
              <TitleIcon className="fas fa-robot" />
              <div>
                <h3>AI Figure Gallery</h3>
                <SubTitle>Manage and create your AI figures</SubTitle>
              </div>
            </Title>
            <CreateButton onClick={handleCreateFigure}>
              <i className="fas fa-plus"></i>
              Create AI Figure
            </CreateButton>
          </HeaderContent>
        </Header>

        <GalleryContent>
          <GalleryGrid>
            {aiFigures.map((figure, index) => (
              <CardWrapper key={index}>
                <StyledAIFigureCard
                  name={figure.name}
                  emoji={figure.emoji}
                  role={figure.role}
                />
              </CardWrapper>
            ))}
          </GalleryGrid>
        </GalleryContent>
      </GalleryWrapper>
    </GalleryContainer>
  );
};

// Styled Components
const GalleryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GalleryWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.8rem;
    color: #333;
    margin: 0;
    font-weight: 600;
  }
`;

const TitleIcon = styled.i`
  font-size: 2rem;
  color: #17df14;
  background: rgba(23, 223, 20, 0.1);
  padding: 1rem;
  border-radius: 12px;
`;

const SubTitle = styled.p`
  color: #666;
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
`;

const CreateButton = styled.button`
  background: linear-gradient(145deg, #17df14, #0a3d0c);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(23, 223, 20, 0.2);

  i {
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 223, 20, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const GalleryContent = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CardWrapper = styled.div`
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;

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

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
`;

const StyledAIFigureCard = styled(AIFigureCard)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #17df14;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .emoji {
    font-size: 2.5rem;
    background: rgba(23, 223, 20, 0.1);
    padding: 1rem;
    border-radius: 12px;
  }

  h4 {
    font-size: 1.3rem;
    color: #333;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }
`;

export default AIFigureGallery;
