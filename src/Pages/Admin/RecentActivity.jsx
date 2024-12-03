import React from "react";
import styled from 'styled-components';
import { FaUserCircle, FaGamepad, FaRobot, FaClock } from 'react-icons/fa';

const ActivityContainer = styled.div`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ActivityCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(76, 175, 80, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  color: white;
  font-size: 1.2rem;
`;

const ActivityInfo = styled.div`
  h3 {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
  }
`;

const ActivityDetails = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 1rem;
`;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      title: 'New User Registration',
      user: 'John Doe',
      details: 'Registered as a new user and completed profile setup',
      time: '5 minutes ago',
      icon: <FaUserCircle />,
      color: 'rgba(99, 102, 241, 0.8)'
    },
    {
      id: 2,
      type: 'arena',
      title: 'Arena Created',
      user: 'Sarah Smith',
      details: 'Created a new arena "AI Challenge 2024"',
      time: '15 minutes ago',
      icon: <FaGamepad />,
      color: 'rgba(16, 185, 129, 0.8)'
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI Figure Updated',
      user: 'Mike Johnson',
      details: 'Updated AI figure parameters for "Advanced Bot"',
      time: '1 hour ago',
      icon: <FaRobot />,
      color: 'rgba(245, 158, 11, 0.8)'
    }
  ];

  return (
    <ActivityContainer>
      <Header>
        <h2>
          <FaClock /> Recent Activity
        </h2>
      </Header>

      <ActivityGrid>
        {activities.map(activity => (
          <ActivityCard key={activity.id}>
            <ActivityHeader>
              <IconWrapper color={activity.color}>
                {activity.icon}
              </IconWrapper>
              <ActivityInfo>
                <h3>{activity.title}</h3>
                <span>{activity.user}</span>
              </ActivityInfo>
            </ActivityHeader>
            <ActivityDetails>
              {activity.details}
            </ActivityDetails>
            <TimeStamp>
              <FaClock />
              {activity.time}
            </TimeStamp>
          </ActivityCard>
        ))}
      </ActivityGrid>
    </ActivityContainer>
  );
};

export default RecentActivity;
