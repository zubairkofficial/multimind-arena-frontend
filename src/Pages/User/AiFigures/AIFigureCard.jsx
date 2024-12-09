import React from "react";
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaType } from "../../../common";
import {  Lock, Unlock } from "lucide-react";
import styled from 'styled-components';
import './aifigures.css'
  const AIFigureCard=({ figure, onSelect })=> {
  return (
    <CardContainer onClick={() => onSelect(figure)}>
      <ImageWrapper>
        <CardImage 
          src={figure?.image ?? Logo} 
          alt={figure.name}
          onError={(e) => e.target.src = Logo}
        />
        <ImageOverlay />
      </ImageWrapper>

      <CardContent>
        <CardTitle>{figure.name}</CardTitle>
        
      

        <Description>{figure.description}</Description>

        <CardFooter>
          <SelectButton onClick={onSelect} className="fs-6">
            Join AI Figure
            <ButtonGlow />
          </SelectButton>

          <StatusContainer>
            <StatusBadge isPrivate={figure.isAiPrivate}>
              {figure.isAiPrivate ? 
                <><Lock size={12} /> {ArenaType.PRIVATE}</> : 
                <><Unlock size={12} /> {ArenaType.PUBLIC}</>
              }
            </StatusBadge>
            <StatusBadge type="model">
              {figure.model || 'AI Model'}
            </StatusBadge>
          </StatusContainer>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
}

// Styled Components
const CardContainer = styled.div`
  background: rgba(16, 16, 16, 0.95);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(23, 223, 20, 0.1);
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(23, 223, 20, 0.3);
    box-shadow: 0 8px 32px rgba(23, 223, 20, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #0a3d0c, #17df14);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const CardContent = styled.div`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
`;

const IconWrapper = styled.div`
  color: #17df14;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const SelectButton = styled.button`
  background: linear-gradient(45deg, #0a3d0c, #17df14);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 223, 20, 0.2);
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: translateX(-100%);
  ${SelectButton}:hover & {
    animation: glow 1.5s infinite;
  }
  @keyframes glow {
    100% {
      transform: translateX(100%);
    }
  }
`;

const StatusContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-transform: uppercase;
  background: ${props => 
    props.isPrivate ? 'rgba(255, 255, 255, 0.1)' : 
    props.type === 'model' ? 'rgba(23, 223, 20, 0.1)' : 
    'rgba(23, 223, 20, 0.1)'};
  color: ${props => 
    props.isPrivate ? '#ffffff' : 
    props.type === 'model' ? '#17df14' : 
    '#17df14'};
  border: 1px solid ${props => 
    props.isPrivate ? 'rgba(255, 255, 255, 0.2)' : 
    props.type === 'model' ? 'rgba(23, 223, 20, 0.2)' : 
    'rgba(23, 223, 20, 0.2)'};

  @media (max-width: 768px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
`;

export default AIFigureCard;