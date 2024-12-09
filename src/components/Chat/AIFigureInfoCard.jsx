import React, { useState } from "react";
import Logo from "../../../public/assets/images/logo/logo.png";
import { ArenaType } from "../../common";
import {
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaBrain,
} from "react-icons/fa";
import { Info } from "lucide-react";
import styled from "styled-components";

function AIFigureInfoCard({
  image,
  aiFigure,
  handleLeaveRoom,
  modelNames = [],
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showInfoDetail, setShowInfoDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header>
        <MainInfo>
          <Avatar>
            <img
              src={image || Logo}
              alt={aiFigure?.name}
              onError={(e) => (e.target.src = Logo)}
            />
          </Avatar>
          <Details>
            <Name>{aiFigure?.name}</Name>
            <Type>
              {aiFigure?.isAiPrivate ? ArenaType.PRIVATE : ArenaType.PUBLIC}
            </Type>
          </Details>
        </MainInfo>

        <Actions>
          <ActionButton
            onClick={() => {
              setShowDetails(!showDetails);
              setShowInfoDetail(false);
            }}
            title="Toggle Details"
          >
            <IconWrapper>
              <Info size={16} />
            </IconWrapper>
          </ActionButton>

          <ActionButton
            onClick={() => {
              setShowInfoDetail(!showInfoDetail);
              setShowDetails(false);
            }}
            title="Toggle Info"
          >
            {showInfoDetail ? <FaChevronUp /> : <FaChevronDown />}
          </ActionButton>

          <ActionButton danger onClick={() => setShowModal(true)} title="Leave">
            <FaSignOutAlt />
          </ActionButton>
        </Actions>
      </Header>

      {showInfoDetail && (
        <DetailsPanel>
          <DetailItem>
            <DetailIcon>
              <FaUsers />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Model Type</DetailLabel>
              <DetailValue>{aiFigure?.model || "AI Model"}</DetailValue>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <FaBrain />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Models</DetailLabel>
              <ModelsList>
                {modelNames.map((modelName, index) => (
                  <ModelBadge key={index}>{modelName}</ModelBadge>
                ))}
              </ModelsList>
            </DetailContent>
          </DetailItem>
        </DetailsPanel>
      )}

      {showDetails && (
        <DetailsPanel>
          <DetailItem>
            <DetailContent>
              <DetailLabel>Description</DetailLabel>
              <DetailValue>{aiFigure?.description}</DetailValue>
            </DetailContent>
          </DetailItem>
        </DetailsPanel>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Leave Chat?</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to leave this chat?</p>
            </ModalBody>
            <ModalFooter>
              <ModalButton secondary onClick={() => setShowModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton
                danger
                onClick={() => {
                  handleLeaveRoom();
                  setShowModal(false);
                }}
              >
                Leave
              </ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
 
  max-height:50vh;
  background: linear-gradient(145deg, #101010, #0a3d0c20);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(
    145deg,
    rgba(13, 138, 13, 0.95) 0%,
    rgba(18, 22, 33, 0.95) 100%
  );
  height: 80px;

  @media (max-width: 768px) {
    padding: 0.75rem;
    height: 70px;
  }

  @media (max-width: 480px) {
    height: 60px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const Name = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Type = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background: ${(props) =>
    props.danger ? "rgba(255, 59, 48, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  border: none;
  color: ${(props) => (props.danger ? "#ff3b30" : "#ffffff")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: ${(props) =>
      props.danger ? "rgba(255, 59, 48, 0.3)" : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  color: #17df14;
  display: flex;
  align-items: center;
`;

const DetailsPanel = styled.div`
  padding: 1.5rem;
  background: linear-gradient(
    145deg,
    rgba(13, 138, 13, 0.95) 0%,
    rgba(18, 22, 33, 0.95) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DetailIcon = styled.div`
  color: #17df14;
  font-size: 1.25rem;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DetailLabel = styled.span`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
`;

const DetailValue = styled.span`
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
`;

const ModelsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
  height: 32px;
`;

const ModelBadge = styled.span`
  background: rgba(23, 223, 20, 0.1);
  color: #17df14;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  border: 1px solid rgba(23, 223, 20, 0.2);

  @media (max-width: 480px) {
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  height: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 95%;
    height: 180px;
  }
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h5`
  margin: 0;
  color: #ffffff;
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #ffffff;
  }
`;

const ModalBody = styled.div`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.secondary &&
    `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}

  ${(props) =>
    props.danger &&
    `
    background: #ff3b30;
    color: #ffffff;

    &:hover {
      background: #ff2d20;
    }
  `}
`;

export default AIFigureInfoCard;
