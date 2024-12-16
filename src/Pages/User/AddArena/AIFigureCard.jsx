import React from "react";
import styled from 'styled-components';
import { Lock, Unlock } from "lucide-react";
import { FaCheck } from 'react-icons/fa';
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaType } from "../../../common";

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

  &.selected {
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(16, 16, 16, 0.95) 100%
  );
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
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
`;

const SelectButton = styled.button`
  background: #17df14;
  color: #0a3d0c;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background: #0a3d0c;
    color: #17df14;
    border: 1px solid #17df14;
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 223, 20, 0.2);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${SelectButton}:hover & {
    opacity: 1;
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
  background: rgba(23, 223, 20, 0.1);
  color: #17df14;
  border: 1px solid rgba(23, 223, 20, 0.2);

  @media (max-width: 768px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const SelectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 61, 12, 0.75);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const SelectMark = styled.span`
  background: #17df14;
  color: #0a3d0c;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
  border: 2px solid #00ff00;
`;

export default function AIFigureCard({ figure, onSelect, isSelected }) {
  return (
    <CardContainer 
      className={isSelected ? "selected" : ""} 
      onClick={() => onSelect(figure)}
    >
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
          {/* <SelectButton onClick={() => onSelect(figure)} className="fs-6">
            Select AI Figure
            <ButtonGlow />
          </SelectButton> */}

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

      {isSelected && (
        <SelectOverlay>
          <SelectMark>
            <FaCheck />
          </SelectMark>
        </SelectOverlay>
      )}
    </CardContainer>
  );
}
