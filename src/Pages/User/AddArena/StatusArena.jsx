import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaBrain } from 'react-icons/fa';
import { BiPlanet } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useCreateArenaRequestMutation, useGetUserByIdQuery, useCreateAiFigureRequestMutation } from '../../../features/api/userApi';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainCard = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RequestCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(23, 223, 20, 0.1) 0%,
    rgba(23, 223, 20, 0.05) 100%
  );
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(23, 223, 20, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(23, 223, 20, 0.1);
    border-color: rgba(23, 223, 20, 0.4);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #17df14;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  
  svg {
    filter: drop-shadow(0 0 10px rgba(23, 223, 20, 0.3));
  }
`;

const CardTitle = styled.h5`
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StatusText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => {
    switch (props.status) {
      case 'PENDING':
        return '#ffd700';
      case 'APPROVED':
        return '#17df14';
      case 'REJECTED':
        return '#ff4444';
      default:
        return '#fff';
    }
  }};
  margin: 1rem 0;
`;

const RequestButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border-radius: 12px;
  border: none;
  background: ${props => props.disabled ? 'rgba(23, 223, 20, 0.1)' : '#17df14'};
  color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#000'};
  font-weight: 600;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 223, 20, 0.3);
  }

  svg {
    animation: ${props => props.disabled ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StatusArena = () => {
  const [createArenaRequest] = useCreateArenaRequestMutation();
  const [createAIFigureRequest] = useCreateAiFigureRequestMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const user = useSelector((state) => state.user.user);
  const { data: userData, isLoading: userLoading, refetch } = useGetUserByIdQuery(user.id);

  const cardData = [
    {
      title: 'AI Figure Creation Request',
      id: 1,
      icon: <FaBrain />,
    },
    {
      title: 'Arena Creation Request',
      id: 2,
      icon: <BiPlanet />,
    },
  ];

  const handleSendRequest = async (id) => {
    setIsLoading(true);
    try {
      if (id === 1) {
        const response = await createAIFigureRequest().unwrap();
        setMessage(response.message || 'Request sent successfully for AI Figure.');
      } else if (id === 2) {
        const response = await createArenaRequest().unwrap();
        setMessage(response.message || 'Request sent successfully for Arena.');
      }
      refetch();
    } catch (error) {
      setMessage('Error sending the request. Please try again.');
    }
    setIsLoading(false);
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MainCard>
        <CardGrid>
          {cardData.map((card, index) => (
            <RequestCard key={index}>
              <IconWrapper>
                {card.icon}
              </IconWrapper>
              <CardTitle>{card.title}</CardTitle>
              <StatusText 
                status={card.id === 1 
                  ? userData?.aiFigureRequestStatus 
                  : userData?.createArenaRequestStatus}
              >
                {card.id === 1 
                  ? userData?.aiFigureRequestStatus 
                  : userData?.createArenaRequestStatus}
              </StatusText>
              <RequestButton
                onClick={() => handleSendRequest(card.id)}
                disabled={card.id === 1 
                  ? userData?.aiFigureRequestStatus === 'PENDING' 
                  : userData?.createArenaRequestStatus === 'PENDING'}
              >
                {(card.id === 1 && userData?.aiFigureRequestStatus === 'PENDING') ||
                 (card.id === 2 && userData?.createArenaRequestStatus === 'PENDING') ? (
                  <>
                    <AiOutlineLoading3Quarters /> Request Pending
                  </>
                ) : (
                  'Send Request'
                )}
              </RequestButton>
            </RequestCard>
          ))}
        </CardGrid>
      </MainCard>
    </Container>
  );
};

export default StatusArena;
