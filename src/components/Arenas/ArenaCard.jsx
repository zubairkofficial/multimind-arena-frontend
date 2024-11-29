import React, { useState } from "react";
import { Clock, Info, Users } from "lucide-react";
import styled from 'styled-components';
import Logo from '../../../public/assets/images/logo/logo.png';

export default function ArenaCard({ arena, onJoin }) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const formatTime = (expiryTime) => {
    if (!expiryTime) return "No Expiry";
    const date = new Date(expiryTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleInfoMouseEnter = (event) => {
    setIsInfoHovered(true);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleInfoMouseLeave = () => {
    setIsInfoHovered(false);
  };

  return (
    <CardContainer>
      <ImageWrapper>
        <CardImage 
          src={arena?.image ?? Logo} 
          alt={arena.name}
          onError={(e) => e.target.src = Logo}
        />
        <ImageOverlay />
      </ImageWrapper>

      <CardContent>
        <CardTitle>{arena.name}</CardTitle>
        
        <InfoGrid>
          <InfoItem>
            <IconWrapper>
              <Users size={16} />
            </IconWrapper>
            <span>
              {arena.userArenas.length}/
              {arena.maxParticipants === 0 ? "∞" : arena.maxParticipants}
            </span>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Clock size={16} />
            </IconWrapper>
            <span>{formatTime(arena.expiryTime)}</span>
          </InfoItem>

          <InfoItem 
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
          >
            <IconWrapper>
              <Info size={16} />
            </IconWrapper>
          </InfoItem>
        </InfoGrid>

        <Description>{arena.description}</Description>

        <CardFooter>
          <JoinButton onClick={onJoin}>
            Join Arena
            <ButtonGlow />
          </JoinButton>

          <StatusContainer>
            <StatusBadge type={arena.arenaType.name.toLowerCase()}>
              {arena.arenaType.name}
            </StatusBadge>
            <StatusBadge status={arena.status}>
              {arena.status}
            </StatusBadge>
          </StatusContainer>
        </CardFooter>
      </CardContent>

      {isInfoHovered && (
        <Tooltip style={{
          top: tooltipPosition.y + 15,
          left: tooltipPosition.x + 15,
        }}>
          <TooltipContent>
            <strong>Description:</strong> {arena?.description}
          </TooltipContent>
          <TooltipContent>
            <strong>Created by:</strong> @{arena?.createdBy?.username}
          </TooltipContent>
        </Tooltip>
      )}
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
  backdrop-filter: blur(10px);

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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const JoinButton = styled.button`
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

  ${JoinButton}:hover & {
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
  text-transform: uppercase;
  background: ${props => 
    props.status === 'open' ? 'rgba(23, 223, 20, 0.1)' :
    props.type === 'premium' ? 'rgba(255, 215, 0, 0.1)' :
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${props => 
    props.status === 'open' ? '#17df14' :
    props.type === 'premium' ? '#ffd700' :
    '#ffffff'
  };
  border: 1px solid ${props => 
    props.status === 'open' ? '#17df14' :
    props.type === 'premium' ? '#ffd700' :
    'rgba(255, 255, 255, 0.2)'
  };
`;

const Tooltip = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #17df14;
  border-radius: 8px;
  padding: 1rem;
  z-index: 1000;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const TooltipContent = styled.p`
  color: white;
  margin: 0.5rem 0;
  font-size: 0.9rem;

  strong {
    color: #17df14;
  }
`;
