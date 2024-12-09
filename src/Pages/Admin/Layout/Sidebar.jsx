import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Logo from "../../../../public/assets/images/logo/logo.png";

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
  border-top: 1px solid rgba(76, 175, 80, 0.1);
  background: rgba(10, 10, 10, 0.8);
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const UserProfile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  text-decoration: none;
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(76, 175, 80, 0.05);

  &:hover {
    background: rgba(76, 175, 80, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  }
`;

const UserAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #4caf50;
  object-fit: cover;
  transition: all 0.3s ease;

  &:hover {
    border-color: #fff;
    transform: scale(1.05);
  }
`;

const UserInfo = styled.div`
  opacity: ${props => props.collapsed ? '0' : '1'};
  visibility: ${props => props.collapsed ? 'hidden' : 'visible'};
  transition: all 0.3s ease;
  
  h6 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }

  span {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 768px) {
    text-align: ${props => props.collapsed ? 'center' : 'left'};
  }
`;

const Copyright = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  padding: ${props => props.collapsed ? '0.5rem' : '1rem'};
  margin: 0.5rem 0 0 0;
  opacity: ${props => props.collapsed ? '0.7' : '1'};
  transition: all 0.3s ease;
`;

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    name: "User",
    email: "user@example.com",
  });

  // Menu items for sidebar
  const menuItems = [
    { path: "/admin/dashboard", icon: "fa-solid fa-house", label: "Dashboard" },
    {
      path: "/admin/users",
      icon: "fa-solid fa-user-group",
      label: "Manage Users",
    },
    {
      path: "/admin/system-status",
      icon: "fa-solid fa-bug",
      label: "Error Logs",
    },
    {
      path: "/admin/manage-arenas",
      icon: "fa-solid fa-gamepad",
      label: "Manage Arenas",
    },
    {
      path: "/admin/manage-ai-figures",
      icon: "fa-solid fa-robot",
      label: "Manage AI Figures",
    }, // New option added
    {
      path: "/admin/arena-types",
      icon: "fa-solid fa-info-circle",
      label: "Manage Arena Types",
    },
    {
      path: "/admin/manage-system-prompt",
      icon: "fa-solid fa-text",
      label: "System Prompt",
    },
    {
      path: "/admin/manage-transactions",
      icon: "fa-solid fa-coins",
      label: "Manage Transactions",
    },
    {
      path: "/admin/arena-access",
      icon: "fa-solid fa-hourglass-half",
      label: "Manage Arena Access",
    },
    {
      path: "/admin/ai-figure-access",
      icon: "fa-solid fa-shield-check",
      label: "Manage AI Figure Access",
    },
    {
      path: "/admin/llm-dashboard",
      icon: "fa-solid fa-brain",
      label: "LLM Model",
    },
    {
      path: "/admin/bundles",
      icon: "fa-solid fa-box",
      label: "Bundle Package",
    },
  
  ];

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""; // Return 'active' class if the path matches
  };

  // Fetch user data from local storage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as an object in local storage
    if (user) {
      setUserDetails({
        name: user.name || "User",
        email: user.email || "user@example.com",
      });
    }
  }, []);

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <LogoSection>
        <Link to="/admin/dashboard">
          <img src={Logo} alt="Admin Logo" />
        </Link>
      </LogoSection>

      <MenuSection>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            to={item.path}
            className={isActive(item.path)}
            collapsed={!sidebarOpen}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </MenuItem>
        ))}
      </MenuSection>

      <UserSection>
        <UserProfile to="/admin/view-profile" collapsed={!sidebarOpen}>
          <UserAvatar
            src="/assets/images/team/team-01sm.jpg"
            alt={userDetails.name}
            onError={(e) => (e.target.src = Logo)}
          />
          <UserInfo collapsed={!sidebarOpen}>
            <h6>{userDetails.name}</h6>
            <span>Administrator</span>
          </UserInfo>
        </UserProfile>
        <Copyright collapsed={!sidebarOpen}>
          Copyright © 2024
        </Copyright>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;
