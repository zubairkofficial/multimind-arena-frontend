import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from '../../../../public/assets/images/logo/logo.png';
import styled from 'styled-components';

const theme = {
  primary: '#17df14',
  secondary: '#0a3d0c',
  accent: '#00ff00',
  dark: '#101010',
  darker: '#000000',
  light: '#ffffff',
  success: 'rgba(76, 175, 80, 0.8)',
  gradient: 'linear-gradient(145deg, #0a3d0c, #17df14)',
};

const ViewUserProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  if (!userData) {
    return <LoadingWrapper>Loading user profile...</LoadingWrapper>;
  }

  return (
    <ProfileContainer style={{marginLeft: `${!sidebarOpen?"5.5rem":"0rem"}`}}>
      <ProfileHeader>
        <Title>User Profile</Title>
        <EditButton to="/edit-profile">
          <i className="fas fa-edit"></i> Edit Profile
        </EditButton>
      </ProfileHeader>

      <ImageSection>
        <ProfileImageWrapper>
          <ProfileImage
            src={userData.image}
            alt={userData.name}
            onError={(e) => e.target.src = Logo}
          />
          <ImageOverlay>
            <i className="fas fa-user"></i>
          </ImageOverlay>
        </ProfileImageWrapper>
        <UserName>{userData.name}</UserName>
      </ImageSection>

      <ProfileForm>
        <FormGrid>
          <FormGroup>
            <Label>Name</Label>
            <InputWrapper>
              <Input
                type="text"
                value={userData?.name || ""}
                disabled
                placeholder="Enter your name"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Username</Label>
            <InputWrapper>
              <Input
                type="text"
                value={userData?.username || ""}
                disabled
                placeholder="Enter username"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <InputWrapper>
              <Input
                type="email"
                value={userData?.email || ""}
                disabled
                placeholder="Enter email"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <InputWrapper>
              <Input
                type="text"
                value={userData?.phoneNumber || "N/A"}
                disabled
                placeholder="Enter phone number"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup fullWidth>
            <Label>Persona</Label>
            <InputWrapper>
              <Input
                type="text"
                value="Coming Soon"
                disabled
                placeholder="Persona details"
              />
            </InputWrapper>
          </FormGroup>
        </FormGrid>
      </ProfileForm>
    </ProfileContainer>
  );
};

// Updated Styled Components
const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${theme.darker};
  color: ${theme.light};
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 255, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${theme.primary};
  font-size: 1.2rem;
  background: ${theme.darker};
  border-radius: 12px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${theme.secondary};

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Title = styled.h4`
  font-size: 2.2rem;
  background: ${theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-weight: 700;
`;

const EditButton = styled(Link)`
  background: ${theme.gradient};
  color: ${theme.light};
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(23, 223, 20, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 223, 20, 0.3);
  }

  i {
    font-size: 1.2rem;
  }
`;

const ImageSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem;
  background: ${theme.dark};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 5px;
  background: ${theme.gradient};

  @media (max-width: 576px) {
    width: 150px;
    height: 150px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.darker};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  background: rgba(10, 61, 12, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;

  i {
    font-size: 2.5rem;
    color: ${theme.light};
  }

  &:hover {
    opacity: 1;
  }
`;

const UserName = styled.h2`
  color: ${theme.primary};
  margin-top: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProfileForm = styled.form`
  background: ${theme.dark};
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid ${theme.secondary};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'span 1'};
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(10, 61, 12, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(10, 61, 12, 0.5);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  color: ${theme.primary};
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.9;
`;

const InputWrapper = styled.div`
  position: relative;
  
  &:focus-within ${Label} {
    color: ${theme.accent};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1rem;
  background: rgba(10, 61, 12, 0.2);
  border: 2px solid ${theme.secondary};
  border-radius: 12px;
  color: ${theme.light};
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:disabled {
    background: rgba(10, 61, 12, 0.15);
    border-color: rgba(23, 223, 20, 0.3);
    color: rgba(255, 255, 255, 0.8);
    cursor: not-allowed;
    
    &:hover {
      border-color: rgba(23, 223, 20, 0.4);
    }
  }

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    background: rgba(10, 61, 12, 0.3);
    box-shadow: 0 0 0 4px rgba(23, 223, 20, 0.15),
                inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export default ViewUserProfile;
