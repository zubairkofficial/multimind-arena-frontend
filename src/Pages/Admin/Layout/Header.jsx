import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { toggleSidebar } from "../../../features/sidebarSlice";
import Logo from '../../../../public/assets/images/logo/logo.png';
import { useGetUserByIdQuery } from "../../../features/api/userApi"; // Import the query hook
import { clearUser } from "../../../features/userSlice";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.sidebarOpen ? '280px' : '70px'};
  height: 70px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    left: 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;

  @media (max-width: 576px) {
    padding: 0 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuToggle = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(76, 175, 80, 0.2);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.2rem;
  }
`;

const LogoLink = styled(Link)`
  img {
    height: 35px;
    transition: all 0.3s ease;
  }
`;

const UserSection = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(76, 175, 80, 0.15);
    transform: translateY(-2px);
  }
`;

const UserAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #4caf50;
  object-fit: cover;
`;

const UserInfo = styled.div`
  text-align: left;
  
  span {
    display: block;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  margin-top: 10px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
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

const Header = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);
  const userId = useSelector((state) => state.user.user?.id); // Assuming user ID is stored in Redux
  const navigate = useNavigate();
  // Fetch user details by ID
  const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
  const [dropdownOpen,setDropdownOpen]=useState(false);
 
  const [userDetails, setUserDetails] = useState({
    name: "Test User", // default values
    email: "test@gmail.com",
  });

  useEffect(() => {
    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored as an object
    if (user) {
      setUserDetails({
        name: user.name || "Test User",
        email: user.email || "test@gmail.com",
      });
    }
  }, []);

  const handleSidebar = () => {
    dispatch(toggleSidebar()); // Dispatch action to toggle sidebar state
  };

  const handleLogout =async () => {
    dispatch(clearUser()); // Clear the Redux user state
    navigate("/login");
  };

  return (
    <HeaderWrapper sidebarOpen={sidebarOpen}>
      <HeaderContainer>
        <LeftSection>
          <MenuToggle onClick={handleSidebar}>
            <i className="fa-sharp fa-regular fa-sidebar" />
          </MenuToggle>
          {/* <LogoLink to="/admin/dashboard">
            <img src={Logo} alt="Logo" />
          </LogoLink> */}
        </LeftSection>

        <UserSection>
          <UserButton onClick={() => setDropdownOpen(!dropdownOpen)}>
            <UserAvatar
              src="/assets/images/team/team-01sm.jpg"
              alt={userDetails.name}
              onError={(e) => e.target.src = Logo}
            />
            <UserInfo>
              <span>{userDetails.name}</span>
            </UserInfo>
            <i className="fa-sharp fa-solid fa-chevron-down" />
          </UserButton>

          <DropdownMenu isOpen={dropdownOpen}>
            <MenuItem to="/admin/view-profile">
              <i className="fa-sharp fa-regular fa-user" />
              <span>Profile</span>
            </MenuItem>
            <MenuItem to="/admin/settings">
              <i className="fa-sharp fa-regular fa-gear" />
              <span>Settings</span>
            </MenuItem>
            <MenuItem to="/login" onClick={handleLogout}>
              <i className="fa-sharp fa-solid fa-right-to-bracket" />
              <span>Logout</span>
            </MenuItem>
          </DropdownMenu>
        </UserSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
