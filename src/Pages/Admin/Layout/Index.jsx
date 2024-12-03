import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';

const DashboardWrapper = styled.main`
  min-height: 100vh;
  background: #0a0a0a;
  position: relative;
`;

const PanelWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-height: 100vh;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: ${props => props.sidebarOpen ? '280px' : '70px'};
  padding: 80px 24px 24px;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 10, 0.95) 0%,
    rgba(8, 8, 8, 0.97) 100%
  );
  
  @media (max-width: 1200px) {
    margin-left: ${props => props.sidebarOpen ? '280px' : '70px'};
    padding: 80px 20px 20px;
  }

  @media (max-width: 992px) {
    margin-left: ${props => props.sidebarOpen ? '280px' : '70px'};
    padding: 75px 16px 16px;
  }

  @media (max-width: 768px) {
    margin-left: ${props => props.sidebarOpen ? '0' : '0'};
    padding: 70px 12px 12px;
    display: ${props => props.sidebarOpen ? 'none' : 'block'};
  }

  @media (max-width: 576px) {
    padding: 65px 10px 10px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
  min-height: calc(100vh - 120px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-width: 576px) {
    padding: 12px;
    border-radius: 12px;
  }
`;

const Index = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <DashboardWrapper>
      <PanelWrapper>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} />
        <ContentWrapper sidebarOpen={sidebarOpen}>
          <ContentContainer>
            <Outlet />
          </ContentContainer>
        </ContentWrapper>
      </PanelWrapper>
    </DashboardWrapper>
  );
};

export default Index;
