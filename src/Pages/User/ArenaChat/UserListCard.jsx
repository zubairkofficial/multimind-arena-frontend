import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../../../public/assets/images/logo/logo.png";

export default function UserListCard({ users, ai }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAi, setIsAi] = useState(false);

  const handleUserClick = (user, isAi) => {
    setSelectedUser(user);
    setIsAi(isAi);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsAi(false);
  };

  return (
    <CardContainer>
      <SectionTitle>Participants</SectionTitle>
      <UserList>
        {users?.map((user, index) => (
          <UserItem key={index} onClick={() => handleUserClick(user, false)}>
            <UserAvatar
              src={user.image || Logo}
              alt={user?.name}
              onError={(e) => (e.target.src = Logo)}
            />
            <UserName>{user?.name}</UserName>
          </UserItem>
        ))}
      </UserList>

      <SectionTitle>AI Figures</SectionTitle>
      <UserList>
        {ai?.map((user, index) => (
          <UserItem key={index} onClick={() => handleUserClick(user, true)}>
            <UserAvatar
              src={user?.image || Logo}
              alt={user?.name}
              onError={(e) => (e.target.src = Logo)}
            />
            <UserName>{user?.name}</UserName>
          </UserItem>
        ))}
      </UserList>

      {showModal && selectedUser && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <UserAvatar
              large
              src={selectedUser.image || Logo}
              alt={selectedUser.name}
              onError={(e) => (e.target.src = Logo)}
            />
            <UserTitle>{selectedUser.name}</UserTitle>
            {isAi ? (
              <AiContent>
                <Description>
                  <strong>Description:</strong> {selectedUser.description || "N/A"}
                </Description>
                <ChatButton>Chat Now</ChatButton>
              </AiContent>
            ) : (
              <UserDetails>
                <DetailItem>
                  <strong>Email:</strong> {selectedUser.email || "N/A"}
                </DetailItem>
                <DetailItem>
                  <strong>Phone:</strong> {selectedUser.phoneNumber || "N/A"}
                </DetailItem>
              </UserDetails>
            )}
          </ModalContent>
        </Modal>
      )}
    </CardContainer>
  );
}

// Enhanced Styled Components
const CardContainer = styled.div`
  padding: 1.5rem;
  background: rgba(16, 16, 16, 0.95);
  border-radius: 12px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(23, 223, 20, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  color: #17df14;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(23, 223, 20, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: ${props => props.children === 'Participants' ? '"👥"' : '"🤖"'};
    font-size: 1.2rem;
  }
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(23, 223, 20, 0.3);
    border-radius: 3px;
  }
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);

  &:hover {
    background: rgba(23, 223, 20, 0.1);
    transform: translateX(5px);
  }
`;

const UserAvatar = styled.img`
  width: ${props => props.large ? '80px' : '40px'};
  height: ${props => props.large ? '80px' : '40px'};
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid #17df14;
  box-shadow: 0 0 15px rgba(23, 223, 20, 0.2);
  transition: all 0.3s ease;

  ${UserItem}:hover & {
    border-color: #fff;
    transform: scale(1.05);
  }
`;

const UserName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  flex: 1;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  background: linear-gradient(145deg, #1a1a1a, #0a3d0c20);
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  color: #fff;
  position: relative;
  text-align: center;
  border: 1px solid rgba(23, 223, 20, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 1.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(23, 223, 20, 0.2);
    transform: rotate(90deg);
  }
`;

const UserTitle = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #17df14;
`;

const AiContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 1rem 0;
`;

const ChatButton = styled.button`
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(23, 223, 20, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 223, 20, 0.3);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailItem = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin: 0;

  strong {
    color: #17df14;
    margin-right: 0.5rem;
  }
`;
