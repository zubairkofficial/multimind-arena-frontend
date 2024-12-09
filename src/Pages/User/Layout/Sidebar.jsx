import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import styled from 'styled-components';
import Logo from "../../../../public/assets/images/logo/logo.png";
import { ArenaRequestStatus, UserTier } from "../../../common";
import { useGetUserByIdQuery } from "../../../features/api/userApi";

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

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '100%' : '0'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const LogoSection = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);

  img {
    height: 40px;
    transition: all 0.3s ease;
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
`;

const UserSection = styled.div`
  padding: 1.2rem;
  margin:0px;
  border-top: 1px solid rgba(76, 175, 80, 0.1);
  background: linear-gradient(180deg, rgba(10, 10, 10, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%);
  transition: all 0.3s ease;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: ${props => props.collapsed ? '0.8rem' : '1.2rem'};
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
`;

const CoinsBadge = styled.div`
  background: linear-gradient(135deg, #0a3d0c 0%, #0d4d0f 100%);
  color: #17df14;
  padding: 0.8rem;
  border-radius: 12px;
  margin: ${props => props.collapsed ? '0.5rem 0' : '1rem 0'};
  display: ${props => props.collapsed ? 'flex' : 'flex'};
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: 100%;
  
  i {
    color: #17df14;
    font-size: 1.1rem;
    filter: drop-shadow(0 2px 4px rgba(23, 223, 20, 0.2));
  }

  span {
    display: ${props => props.collapsed ? 'none' : 'block'};
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const user = useSelector((state) => state.user.user);
  const { data: userData, refetch } = useGetUserByIdQuery(user.id);
  const [userDetails, setUserDetails] = useState({ name: "User" });
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails({ name: user.name || "User" });
      refetch();
    }
  }, []);

  const mainMenuItems = [
    { path: "/dashboard", icon: "fa-home", label: "Playground" },
    ...(userData?.tier === UserTier.FREE ? [
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
    <SidebarContainer isOpen={sidebarOpen}>
      {/* <LogoSection>
        <Link to="/dashboard">
          <img src={Logo} alt="Logo" />
        </Link>
      </LogoSection> */}

      <MenuSection>
        {mainMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            to={item.path}
            className={isActive(item.path)}
            collapsed={!sidebarOpen}
          >
            <i className={`fa-solid ${item.icon}`} />
            <span>{item.label}</span>
          </MenuItem>
        ))}

        <div style={{  }}>
          {settingMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              to={item.path}
              className={isActive(item.path)}
              collapsed={!sidebarOpen}
            >
              <i className={`fa-solid ${item.icon}`} />
              <span>{item.label}</span>
            </MenuItem>
          ))}
        </div>
        <UserSection collapsed={!sidebarOpen}>
        <UserProfile to="/edit-profile" collapsed={!sidebarOpen}>
          <img
            src={user.image || Logo}
            alt={userDetails.name}
            onError={(e) => (e.target.src = Logo)}
          />
          {sidebarOpen && <span>{userDetails.name}</span>}
        </UserProfile>

        <CoinsBadge collapsed={!sidebarOpen}>
          <i className="fas fa-coins" />
          {sidebarOpen && <span>{userData?.availableCoins} Coins</span>}
        </CoinsBadge>

        <UpgradeButton to="/deals" collapsed={!sidebarOpen}>
          <i className="fas fa-arrow-up" />
          {sidebarOpen && <span>Upgrade</span>}
        </UpgradeButton>
      </UserSection>
      </MenuSection>

     
    </SidebarContainer>
  );
};

export default Sidebar;
