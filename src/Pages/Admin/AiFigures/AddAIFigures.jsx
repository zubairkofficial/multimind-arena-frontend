import React from "react";
import AIFigureDetailsForm from "./AIFigureDetailsForm";
import styled from 'styled-components';

const MainContent = styled.div`
  padding: 2rem;
  background: #121212;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #fff;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DynamicPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const DashboardContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const AddAIFigure = () => {
  return (
    <MainContent>
      <DynamicPageContent>
        <DashboardContent>
          <AIFigureDetailsForm />
        </DashboardContent>
      </DynamicPageContent>
    </MainContent>
  );
};

export default AddAIFigure;
