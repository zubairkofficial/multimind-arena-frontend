import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserCheck } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoGameController } from "react-icons/io5";
import styled from 'styled-components';

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => {
      switch (props.variant) {
        case 'total-users-card':
          return 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)';
        case 'active-arenas-card':
          return 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)';
        case 'ai-figures-card':
          return 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)';
        case 'daily-active-users-card':
          return 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)';
        default:
          return 'transparent';
      }
    }};
    z-index: -1;
  }

  &:hover {
    border-color: ${props => {
      switch (props.variant) {
        case 'total-users-card': return 'rgba(99, 102, 241, 0.5)';
        case 'active-arenas-card': return 'rgba(16, 185, 129, 0.5)';
        case 'ai-figures-card': return 'rgba(245, 158, 11, 0.5)';
        case 'daily-active-users-card': return 'rgba(239, 68, 68, 0.5)';
        default: return 'rgba(255, 255, 255, 0.2)';
      }
    }};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.5rem;
  background: ${props => {
    switch (props.variant) {
      case 'total-users-card': return 'rgba(99, 102, 241, 0.2)';
      case 'active-arenas-card': return 'rgba(16, 185, 129, 0.2)';
      case 'ai-figures-card': return 'rgba(245, 158, 11, 0.2)';
      case 'daily-active-users-card': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'total-users-card': return '#6366f1';
      case 'active-arenas-card': return '#10b981';
      case 'ai-figures-card': return '#f59e0b';
      case 'daily-active-users-card': return '#ef4444';
      default: return '#fff';
    }
  }};
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

const CardCount = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AdminCards = ({ userCount, arenaTypesCount, arenaCount, aiFiguresCount }) => {
  const cardsData = [
    {
      title: "Total Users",
      count: userCount,
      className: "total-users-card",
      path: "/admin/users",
      icon: <FaUser />,
    },
    {
      title: "Active Arenas",
      count: arenaCount,
      className: "active-arenas-card",
      path: "/admin/manage-arenas",
      icon: <IoGameController />,
    },
    {
      title: "AI Figures",
      count: aiFiguresCount,
      className: "ai-figures-card",
      path: "/admin/manage-ai-figures",
      icon: <HiMiniCpuChip />,
    },
    {
      title: "Total Arena Types",
      count: arenaTypesCount,
      className: "daily-active-users-card",
      path: "/admin/users",
      icon: <FaUserCheck />,
    },
  ];

  return (
    <CardsGrid>
      {cardsData.map((card, index) => (
        <CardLink to={card.path} key={index}>
          <Card variant={card.className}>
            <CardContent>
              <IconWrapper variant={card.className}>
                {card.icon}
              </IconWrapper>
              <CardInfo>
                <CardTitle>{card.title}</CardTitle>
                <CardCount>{card.count}</CardCount>
              </CardInfo>
            </CardContent>
          </Card>
        </CardLink>
      ))}
    </CardsGrid>
  );
};

export default AdminCards;
