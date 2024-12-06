import React, { useState } from "react";
import styled from "styled-components";
import Logo from '../../../public/assets/images/logo/logo.png';

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #0a3d0c 0%, #17df14 100%);
  color: #fff;
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const ModelBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ModelBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  color: #fff;
`;

const LeaveButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  i {
    font-size: 1rem;
  }
`;

function AIFigureInfoCard({
  image,
  name,
  handleLeaveRoom,
  modelNames
}) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const confirmLeave = () => {
    handleLeaveRoom();
  };

  return (
    <CardContainer>
      <CardHeader>
        <div className="d-flex align-items-center gap-3">
          <AvatarContainer>
            <Avatar
              src={image || Logo}
              alt={`${name} avatar`}
              onError={(e) => e.target.src = Logo}
            />
          </AvatarContainer>
          <Info>
            <Name>{name}</Name>
            <ModelBadges>
              {modelNames.map((modelName, index) => (
                <ModelBadge key={index}>
                  {modelName}
                </ModelBadge>
              ))}
            </ModelBadges>
          </Info>
        </div>
        <LeaveButton onClick={confirmLeave} title="Leave Chat">
          <i className="fas fa-sign-out-alt"></i>
        </LeaveButton>
      </CardHeader>
    </CardContainer>
  );
}

export default AIFigureInfoCard;
