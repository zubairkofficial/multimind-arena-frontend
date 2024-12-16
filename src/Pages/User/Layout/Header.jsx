import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { toggleSidebar, toggleRightSidebar } from "../../../features/sidebarSlice";
import { clearUser } from "../../../features/userSlice";
import { useGetUserByIdQuery,useLogoutMutation } from "../../../features/api/userApi";
import Logo from '../../../../public/assets/images/logo/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const rightSidebarOpen = useSelector((state) => state.rightSidebar.rightSidebarOpen);
  const userId = useSelector((state) => state.user.user?.id); // Assuming user ID is stored in Redux

  // Fetch user details by ID
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);
  const [logout, { isLoading:isLogout, error }] = useLogoutMutation();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleRightSidebar = () => {
    dispatch(toggleRightSidebar());
  };

  const handleLogout =async () => {
    await logout().unwrap()
    dispatch(clearUser());
    navigate('/login')
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderContent>
          <LeftSection>
            <SidebarToggle onClick={handleSidebar} isOpen={sidebarOpen}>
              <i className="fa-sharp fa-regular fa-sidebar" />
            </SidebarToggle>
            
            <LogoLink to="/dashboard">
              <LogoImage src="/assets/images/logo/logo.png" alt="ChatBot Logo" />
            </LogoLink>
          </LeftSection>

          <RightSection>
            <UserPanel>
              <UserCard>
                <UserInfo>
                  <UserAvatar
                    src={user?.image || Logo}
                    alt={user?.name}
                    onError={(e) => (e.target.src = Logo)}
                  />
                  <UserName>{user?.name || "Loading..."}</UserName>
                  <DropdownIcon>
                    <i className="fa-sharp fa-solid fa-chevron-down" />
                  </DropdownIcon>
                </UserInfo>
              </UserCard>

              <DropdownMenu>
                <UserProfileSection>
                  <UserAvatarLarge
                    src={user?.image || Logo}
                    alt={user?.name}
                    onError={(e) => (e.target.src = Logo)}
                  />
                  <UserDetails>
                    <UserFullName>{user?.name || "Loading..."}</UserFullName>
                    <UserCoins>{user?.availableCoins} Coins</UserCoins>
                    <ViewProfileLink to="/view-profile">
                      View Profile
                    </ViewProfileLink>
                  </UserDetails>
                </UserProfileSection>

                <Divider />

                <MenuList>
                  <MenuItem>
                    <MenuLink to="/edit-profile">
                      <i className="fa-sharp fa-regular fa-user" />
                      <span>Edit Profile</span>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink to="/deals">
                      <i className="fa-sharp fa-regular fa-briefcase" />
                      <span>Plans and Billing</span>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink to="/dashboard">
                      <i className="fa-sharp fa-regular fa-users" />
                      <span>History</span>
                    </MenuLink>
                  </MenuItem>
                </MenuList>

                <Divider />

                <MenuList>
                  <MenuItem>
                    <LogoutButton onClick={handleLogout}>
                      <i className="fa-sharp fa-solid fa-right-to-bracket me-3" />
                      <span>Logout</span>
                    </LogoutButton>
                  </MenuItem>
                </MenuList>
              </DropdownMenu>
            </UserPanel>

            <SidebarToggle onClick={handleRightSidebar} isOpen={rightSidebarOpen}>
              <i className="fa-sharp fa-regular fa-sidebar-flip" />
            </SidebarToggle>
          </RightSection>
        </HeaderContent>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

// Styled Components
const HeaderWrapper = styled.header`
  background: #101010;
  border-bottom: 1px solid #0a3d0c;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  padding: 0.8rem 2rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: #101010;
  border: 1px solid #0a3d0c;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SidebarToggle = styled.button`
  background: #0a3d0c;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #17df14;
    transform: translateY(-2px);
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  
  @media (max-width: 768px) {
    height: 32px;
  }
`;

const UserPanel = styled.div`
  position: relative;
  
  &:hover ${DropdownMenu} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const UserCard = styled.div`
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  border: 1px solid rgba(76, 175, 80, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(23, 223, 20, 0.2);
  }
`;



const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00ff00;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
 
`;

const UserProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserAvatarLarge = styled.img`
  width: 4rem;
  height: 3.4rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00ff00;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserFullName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const UserCoins = styled.span`
  font-size: 1rem;
  color: #808080;
`;

const ViewProfileLink = styled(Link)`
  color: #00ff00;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border-top: 4px solid #00ff00;
  margin: 0.5rem 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  i {
    color: #4caf50;
    font-size: 1.1rem;
  }

  &:hover {
    background: rgba(76, 175, 80, 0.1);
    transform: translateX(5px);
  }
`;

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

   i {
    color: #4caf50;
    font-size: 1.1rem;
    margin-right:1rem;
  }
  &:hover {
    text-decoration: underline;
  }

`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

export default Header;
