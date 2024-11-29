import React, { useState } from "react";
import ArenaDetailsForm from "./ArenaDetailsForm";
import { useGetAllLlmModelsQuery } from "../../../features/api/LlmModelApi";
import styled from 'styled-components';
import { FaLock, FaGlobe, FaRobot, FaPlus } from 'react-icons/fa';

const UserAddArena = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const { data: llmModels, error, isLoading } = useGetAllLlmModelsQuery();

  const handleToggle = () => {
    setIsPrivate((prevState) => !prevState);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <TitleWrapper>
            <PageTitle>
              <FaPlus className="icon" /> Add New Arena
            </PageTitle>
            <SubTitle>
              <FaRobot className="icon" /> Create your custom arena with advanced AI capabilities
            </SubTitle>
          </TitleWrapper>
          
          <ToggleWrapper>
            <ToggleLabel>
              <VisibilityText>Arena Visibility</VisibilityText>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={isPrivate}
                  onChange={handleToggle}
                />
                <ToggleSlider isPrivate={isPrivate}>
                  <ToggleIcon isPrivate={isPrivate}>
                    {isPrivate ? <FaLock /> : <FaGlobe />}
                  </ToggleIcon>
                  <ToggleText isPrivate={isPrivate}>
                    {isPrivate ? 'Private' : 'Public'}
                  </ToggleText>
                </ToggleSlider>
              </ToggleSwitch>
            </ToggleLabel>
          </ToggleWrapper>
        </HeaderSection>

        <FormSection>
          <ArenaDetailsForm 
            isPrivate={isPrivate} 
            llmModels={llmModels}
            selectedModel={selectedModel}
            onModelSelect={handleModelSelect}
          />
        </FormSection>
      </ContentWrapper>
    </PageContainer>
  );
};

// Enhanced Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(145deg, #000000, #0a1f0a);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(16, 16, 16, 0.95);
  border-radius: 20px;
  border: 1px solid rgba(23, 223, 20, 0.1);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const HeaderSection = styled.div`
  padding: 2.5rem;
  background: linear-gradient(145deg, rgba(16, 16, 16, 0.95), rgba(10, 61, 12, 0.3));
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid rgba(23, 223, 20, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }
`;

const TitleWrapper = styled.div`
  flex: 1;

  .icon {
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

const PageTitle = styled.h1`
  color: #17df14;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleWrapper = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(23, 223, 20, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const VisibilityText = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
`;

const ToggleLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 200px;
  height: 40px;

  @media (max-width: 576px) {
    width: 160px;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isPrivate ? 
    'linear-gradient(145deg, #0a3d0c, #17df14)' : 
    'linear-gradient(145deg, #101010, #1a1a1a)'};
  transition: all 0.4s ease;
  border-radius: 20px;
  border: 2px solid ${props => props.isPrivate ? '#17df14' : '#0a3d0c'};
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  box-shadow: ${props => props.isPrivate ? 
    '0 0 15px rgba(23, 223, 20, 0.2)' : 
    'none'};
`;

const ToggleIcon = styled.div`
  position: absolute;
  height: calc(100% - 8px);
  aspect-ratio: 1;
  left: ${props => props.isPrivate ? 'calc(100% - 36px)' : '4px'};
  bottom: 4px;
  background: ${props => props.isPrivate ? '#17df14' : '#0a3d0c'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: all 0.4s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ToggleText = styled.span`
  color: white;
  margin-left: ${props => props.isPrivate ? '1rem' : '3rem'};
  font-weight: 500;
  transition: all 0.4s ease;
`;

const FormSection = styled.div`
  padding: 2.5rem;
  background: rgba(16, 16, 16, 0.95);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export default UserAddArena;
