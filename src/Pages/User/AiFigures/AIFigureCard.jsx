import React from "react";
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaType } from "../../../common";
import { FaUser, FaLock, FaGlobe } from 'react-icons/fa';
import styled from 'styled-components';

export default function AIFigureCard({ figure, onSelect }) {
  return (
    <CardContainer onClick={() => onSelect(figure)}>
      <ImageWrapper>
        <CardImage
          alt={figure.name}
          src={figure.image || Logo}
          onError={(e) => (e.target.src = Logo)}
        />
        <BadgesContainer>
          <PrivacyBadge isPrivate={figure.isAiPrivate}>
            {figure.isAiPrivate ? 
              <><FaLock /> {ArenaType.PRIVATE}</> : 
              <><FaGlobe /> {ArenaType.PUBLIC}</>
            }
          </PrivacyBadge>
        </BadgesContainer>
        <ImageOverlay />
      </ImageWrapper>
      
      <CardContent>
        <CreatorInfo>
          <CreatorIcon>
            <FaUser />
          </CreatorIcon>
        <CardTitle>{figure.name}</CardTitle>

        </CreatorInfo>
        <CardDescription>{figure.description}</CardDescription>
      </CardContent>
    </CardContainer>
  );
}

// Styled Components
const CardContainer = styled.div`
  background: rgba(10, 61, 12, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(10, 61, 12, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(23, 223, 20, 0.2);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(23, 223, 20, 0.3);
    border-color: #17df14;
    background: rgba(10, 61, 12, 0.3);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  background: linear-gradient(145deg, #0a3d0c, #17df14);
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
    rgba(10, 61, 12, 0.3) 100%
  );
  transition: opacity 0.3s ease;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const BadgesContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
`;

const PrivacyBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => props.isPrivate ? 
    'rgba(10, 61, 12, 0.9)' : 
    'rgba(23, 223, 20, 0.9)'};
  color: white;
  backdrop-filter: blur(4px);
  border: 1px solid ${props => props.isPrivate ? 
    '#0a3d0c' : 
    '#17df14'};
  
  svg {
    font-size: 0.9rem;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background: rgba(10, 61, 12, 0.1);
  backdrop-filter: blur(10px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      #17df14,
      transparent
    );
  }
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
`;

const CreatorIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px rgba(23, 223, 20, 0.2);

  svg {
    font-size: 1rem;
  }
`;

const CreatorName = styled.span`
  font-size: 0.9rem;
  color: #17df14;
  font-weight: 500;
  
  &:hover {
    color: #00ff00;
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.8rem 0;
  font-size: 1.3rem;
  color: #17df14;
  font-weight: 600;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${CardContainer}:hover & {
    color: #00ff00;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(23, 223, 20, 0.9);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
