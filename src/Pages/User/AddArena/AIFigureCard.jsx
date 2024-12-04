import React from "react";
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(10, 61, 12, 0.15);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(23, 223, 20, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(23, 223, 20, 0.4);
    box-shadow: 0 8px 24px rgba(10, 61, 12, 0.25);
  }

  &.selected {
    border-color: #17df14;
    box-shadow: 0 0 0 2px rgba(23, 223, 20, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background: rgba(10, 61, 12, 0.2);
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Creator = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(10, 61, 12, 0.85);
  color: #17df14;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(23, 223, 20, 0.2);
`;

const Overlay = styled.div`
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
`;

const TickMark = styled.span`
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

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: linear-gradient(
    145deg, 
    rgba(10, 61, 12, 0.15) 0%, 
    rgba(10, 61, 12, 0.05) 100%
  );

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #17df14;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(10, 61, 12, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  margin: 0;
  color: #4caf50;
  font-size: 0.9rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
`;

export default function AIFigureCard({ figure, onSelect, isSelected }) {
  return (
    <Card className={isSelected ? "selected" : ""} onClick={onSelect}>
      <ImageWrapper>
        <Image alt={figure.name} src={figure.image} />
        <Creator>By: @{figure.creator}</Creator>
        {isSelected && (
          <Overlay>
            <TickMark>✓</TickMark>
          </Overlay>
        )}
      </ImageWrapper>
      <Content>
        <Title>{figure.name}</Title>
        <Description>{figure.description}</Description>
      </Content>
    </Card>
  );
}
