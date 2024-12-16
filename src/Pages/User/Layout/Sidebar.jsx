import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import styled from 'styled-components';
import Logo from "../../../../public/assets/images/logo/logo.png";
import {  ArenaRequestStatus, UserTier } from "../../../common";
import { useGetUserByIdQuery } from "../../../features/api/userApi";
import { FaBars, FaTimes } from 'react-icons/fa';

// Styled Components (reusing from Admin Sidebar)
const SidebarContainer = styled.div`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  height: 100vh;
  width: ${props => props.isOpen ? '280px' : '70px'};
  position: fixed;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid rgba(76, 175, 80, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '100%' : '0'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.isOpen ? '0 0 15px rgba(0, 0, 0, 0.3)' : 'none'};
    z-index: 1050;
  }
`;


const MenuSection = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(76, 175, 80, 0.2);
    border-radius: 20px;
  }
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  margin: 0.4rem 0;
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  position: relative;

  &.active {
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: #4caf50;
      border-radius: 0 3px 3px 0;
    }
  }

  &:hover {
    background: rgba(76, 175, 80, 0.05);
    color: #4caf50;
    transform: translateX(5px);
  }

  i {
    width: 24px;
    font-size: 1.1rem;
    margin-right: ${props => props.collapsed ? '0' : '1rem'};
    text-align: center;
  }

  span {
    display: ${props => props.collapsed ? 'none' : 'block'};
    font-size: 0.9rem;
    font-weight: 500;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    margin: 0.2rem 0;
    border-radius: 0;
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const UserSection = styled.div`
  padding: 1.2rem;
  margin:0px;
  border-top: 1px solid rgba(76, 175, 80, 0.1);
  background: linear-gradient(180deg, rgba(10, 10, 10, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%);
  transition: all 0.3s ease;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
    position: sticky;
    bottom: 0;
    background: rgba(10, 10, 10, 0.98);
    border-top: 1px solid rgba(76, 175, 80, 0.1);
  }
`;

const UserProfile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  text-decoration: none;
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(76, 175, 80, 0.08);
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  width: 100%;

  &:hover {
    background: rgba(76, 175, 80, 0.12);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  }

  img {
    width: ${props => props.collapsed ? '35px' : '40px'};
    height: ${props => props.collapsed ? '35px' : '40px'};
    min-width: ${props => props.collapsed ? '35px' : '40px'};
    border-radius: 50%;
    border: 2px solid #4caf50;
    transition: all 0.3s ease;
    object-fit: cover;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
    
    &:hover {
      transform: scale(1.05);
      border-color: #45a049;
    }
  }

  span {
    display: ${props => props.collapsed ? 'none' : 'block'};
    opacity: ${props => props.collapsed ? 0 : 1};
    visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
    transition: all 0.3s ease;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    
    img {
      width: 40px;
      height: 40px;
      min-width: 40px;
    }
  }
`;



const UpgradeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  background: linear-gradient(135deg, #0a3d0c 0%, #0d4d0f 100%);
  color: #00ff00;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #0d4d0f 0%, #0f5f12 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.15);
  }

  i {
    font-size: 1.1rem;
  }

  span {
    display: ${props => props.collapsed ? 'none' : 'block'};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  background: rgba(16, 16, 16, 0.95);
  border: 1px solid rgba(76, 175, 80, 0.2);
  color: #17df14;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(23, 223, 20, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { data: userData, refetch } = useGetUserByIdQuery(user.id);
  const [userDetails, setUserDetails] = useState({ name: "User" });
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  const handleMenuClick = () => {
    if (isMobile) {
      dispatch({ type: 'sidebar/toggleSidebar' });
    }
  };


  console.log("userData?.tier === UserTier.FREE && (userData.createArenaRequestStatus !== ArenaRequestStatus.APPROVED && userData.aiFigureRequestStatus !== ArenaRequestStatus.APPROVED",userData?.tier === UserTier.FREE && (userData.createArenaRequestStatus !== ArenaRequestStatus.APPROVED && userData.aiFigureRequestStatus !== ArenaRequestStatus.APPROVED))
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails({ name: user.name || "User" });
      refetch();
    }
  }, []);

  const mainMenuItems = [
    { path: "/dashboard", icon: "fa-home", label: "Playground" },
    ...(userData?.tier === UserTier.FREE && (userData.createArenaRequestStatus !== ArenaRequestStatus.APPROVED || userData.aiFigureRequestStatus !== ArenaRequestStatus.APPROVED) ? [
      { path: "/request-arena", icon: "fa-plus-circle", label: "Request" }
    ] : []),
    { path: "/ai-figure-gallery", icon: "fa-images", label: "AI Figure Gallery" },
  ];

  const settingMenuItems = [
    { path: "/view-profile", icon: "fa-user", label: "Profile Details" },
    { path: "/purchase", icon: "fa-shop", label: "Buy Arena Coins" },
    { path: "/deals", icon: "fa-gift", label: "Subscription Bundle Deals" },
  ];

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      <MobileToggle onClick={() => dispatch({ type: 'sidebar/toggleSidebar' })}>
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </MobileToggle>
      
      <SidebarContainer isOpen={sidebarOpen}  >
        <MenuSection>
          {mainMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              to={item.path}
              className={isActive(item.path)}
              collapsed={!sidebarOpen}
              onClick={handleMenuClick}
            >
              <i className={`fa-solid ${item.icon}`} />
              <span>{item.label}</span>
            </MenuItem>
          ))}

          <div>
            {settingMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                to={item.path}
                className={isActive(item.path)}
                collapsed={!sidebarOpen}
                onClick={handleMenuClick}
              >
                <i className={`fa-solid ${item.icon}`} />
                <span>{item.label}</span>
              </MenuItem>
            ))}
          </div>
        </MenuSection>

        <MenuSection className="mt-5">
          <UserSection collapsed={!sidebarOpen}>
            <UserProfile 
              to="/edit-profile" 
              collapsed={!sidebarOpen}
              onClick={handleMenuClick}
            >
              <img
                src={user.image || Logo}
                alt={userDetails.name}
                onError={(e) => (e.target.src = Logo)}
              />
              {sidebarOpen && <span>{userDetails.name}</span>}
            </UserProfile>

        
 <UpgradeButton 
              to="/deals" 
              collapsed={!sidebarOpen}
              onClick={handleMenuClick}
            className="mt-3"
            >
              <i className="fas fa-coins" />
              {sidebarOpen && <span>{userData?.availableCoins} Coins</span>}
            </UpgradeButton>
            <UpgradeButton 
              to="/deals" 
              collapsed={!sidebarOpen}
              onClick={handleMenuClick}
                className="mt-3"
            >
              <i className="fas fa-arrow-up" />
              {sidebarOpen && <span>Upgrade</span>}
            </UpgradeButton>
          </UserSection>
        </MenuSection>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
