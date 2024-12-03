import React, { useEffect, useState, useRef } from "react";
import { useGetAllArenasQuery } from "../../features/api/arenaApi";
import ArenaCategory from "../../components/Arenas/ArenaCategory";
import SearchBar from "../../components/Searchbar/Searchbar";
import { useNavigate } from "react-router";
import { Spinner, Alert } from "react-bootstrap";
import Preloader from "../../Pages/Landing/Preloader";
import { useSelector } from "react-redux";
import { getSocket, initiateSocketConnection } from "../../app/socket";
import "./../../components/Arenas/arenas.css";
import { ArenaRequestStatus, UserTier } from '../../common'; // Ensure this is imported to check status
import {  useGetUserByIdQuery,useGetUserInfoCountQuery } from '../../features/api/userApi'; // Import the query hook
import { FaUser,FaRobot  } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import styled from 'styled-components';




export default function UserDashboard() {
  const { data: arenas, error, isLoading, refetch } = useGetAllArenasQuery();
  const [showOverlay, setShowOverlay] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [notification, setNotification] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const isMounted = useRef(true);

  
  const { data: userData, isLoading: userLoading, error: userError } = useGetUserByIdQuery(user?.id);
 
  const { data: userTotalCountData } = useGetUserInfoCountQuery(userId); // Fetch API data

  const cardsData = [
    {
      title: "Remaning Coins",
      count: userData?.availableCoins??0,
      className: "total-users-card",
      path: "/admin/users",
      userIcon: <FaUser />,
    },
    {
      title: "Total Arenas",
      count: userTotalCountData?.arenasCount??0,
      className: "active-arenas-card",
      path: "/admin/manage-arenas",
      userIcon: <FaUserCheck />,
    },
    {
      title: "AI Figures",
      count: userTotalCountData?.aifiguresCount??0,
      className: "ai-figures-card",
      path: "/admin/manage-ai-figures",
      userIcon: <HiMiniCpuChip />,
    },
    {
      title: "Total AI Figures",
      count: userTotalCountData?.totalAiFigureCount??0,
      className: "daily-active-users-card",
      path: "/admin/users",
      userIcon: <FaRobot />
    },
  ];
  useEffect(() => {
    isMounted.current = true;
    refetch();
    try {
      initiateSocketConnection();
      const socket = getSocket();

      if (socket) {
        handleSocketEvents(socket);
      } else {
        console.error(
          "Socket connection not established. Check socket initialization."
        );
        setJoinError("Socket connection not established.");
      }
    } catch (error) {
      console.error("Error initializing socket connection:", error);
      setJoinError("Failed to initialize socket connection.");
    }

    return () => {
      isMounted.current = false;
      const socket = getSocket();
      if (socket) {
        socket.off("userJoined");
        socket.off("userRejoined");
        socket.off("userLeft");
      }
    };
  }, []);

  const handleSocketEvents = (socket) => {
    socket.on("userJoined", (response) =>
      handleArenaNavigation(response.joinArena, "userJoined")
    );
    socket.on("error", (response) => {
      console.log("Error", response);
      console.log(typeof response);
      setJoinError(response.errorLogService.response.message);
    });
    socket.on("userRejoined", (response) =>
      handleArenaNavigation(response.joinArena, "userRejoined")
    );
    socket.on("userLeft", (response) => handleUserLeft(response));
    socket.on("error", (error) => {
      console.error("Socket error event:", error);
    });
  };

  const handleArenaNavigation = (response, eventType) => {
    refetch();
    if (isMounted.current) {
      setShowOverlay(false);
      setIsJoining(false);
    }
    console.log("Response", response);

    // Introduce a small delay before navigation
    setTimeout(() => {
      response && navigate(`/arena-chat/${response?.id}`, { state: response });
    }, 500);
  };

  const handleUserLeft = (response) => {
    console.log("userLeft:", response.leftArena);
    refetch();
    setNotification(
      `User ${response.leftArena.userName || response.userId} has left.`
    );
    setTimeout(() => setNotification(null), 3000);
  };

  const handleJoinArena = async (arena) => {
    if (!arena) {
      console.error("Arena data is missing or undefined!");

      return;
    }

    try {
      setJoinError(null);
      setShowOverlay(true);
      setIsJoining(true);
      const socket = getSocket();

      if (socket) {
        socket.emit(
          "joinRoom",
          { arenaId: arena?.id, userId },
          (error, success) => {
            if (error) {
              console.error("Socket error:", error);

              setIsJoining(false);
            } else if (success) {
              refetch();
              setShowOverlay(false);
              setIsJoining(false);
            }
          }
        );
      } else {
        setJoinError("Socket connection not established.");
        setShowOverlay(false);
        setIsJoining(false);
      }
    } catch (error) {
      console.error("Error joining arena:", error);

      setShowOverlay(true);
      setIsJoining(false);
    }
  };
  console.log("No join", joinError);
  const arenasByType = arenas?.reduce((acc, arena) => {
    const type = arena?.arenaType?.name;
    if (!acc[type]) acc[type] = [];
    acc[type].push(arena);
    return acc;
  }, {});

  const sortedArenaCategories = Object.entries(arenasByType || {}).sort(
    (a, b) => b[1].length - a[1].length
  );

  if (isLoading) return <Preloader />;
  if (error) return <div>Error loading arenas: {error.message}</div>;

  return (
    <DashboardContainer>
      <DashboardContent>
        <WelcomeSection>
          <SearchBar
            onClick={() => navigate(userData?.tier === UserTier.PREMIUM ? "/add-arena" : userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED ? "/add-arena" : "/request-arena")}
            heading={`Welcome to Arena1, ${userData?.name}`}
            title="Create Arena"
            placeholder="Search for arenas..."
            isPremium={userData?.createArenaRequestStatus === ArenaRequestStatus?.APPROVED ? false : userData?.tier === UserTier.FREE}
          />
        </WelcomeSection>

        <StatsGrid>
          {cardsData.map((card, index) => (
            <StatsCard key={index} to={card.path}>
              <CardContent className={card.className}>
                <IconWrapper>{card.userIcon}</IconWrapper>
                <CardInfo>
                  <CardTitle>{card.title}</CardTitle>
                  <CardCount>{card.count}</CardCount>
                </CardInfo>
              </CardContent>
            </StatsCard>
          ))}
        </StatsGrid>

        <ArenasSection>
          {arenas?.length > 0 ? (
            <>
              <ArenaCategory
                title="All Arenas"
                arenas={arenas}
                handleJoin={handleJoinArena}
              />
              {sortedArenaCategories?.map(([type, arenasList]) => (
                <ArenaCategory
                  key={type}
                  title={type}
                  arenas={arenasList}
                  handleJoin={handleJoinArena}
                />
              ))}
            </>
          ) : (
            <NoArenasMessage>No arenas available</NoArenasMessage>
          )}
        </ArenasSection>

        {(isJoining || showOverlay) && (
          <StyledOverlay>
            <OverlayContent>
              {isJoining && !joinError && (
                <LoadingWrapper>
                  <Spinner animation="border" role="status" />
                  <LoadingText>Joining the arena...</LoadingText>
                </LoadingWrapper>
              )}
              {joinError && (
                <ErrorMessage>{joinError}</ErrorMessage>
              )}
            </OverlayContent>
          </StyledOverlay>
        )}

        {notification && (
          <NotificationWrapper>
            <Alert variant="info">{notification}</Alert>
          </NotificationWrapper>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
}

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DashboardContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatsCard = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardContent = styled.div`
  background: #101010;
  border: 1px solid #0a3d0c;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(23, 223, 20, 0.15);
    border-color: #17df14;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(145deg, #0a3d0c, #17df14);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h5`
  color: #17df14;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

const CardCount = styled.h2`
  color: white;
  margin: 0.5rem 0 0;
  font-size: 2rem;
  font-weight: 700;
`;

const ArenasSection = styled.div`
  background: #101010;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #0a3d0c;
`;

const NoArenasMessage = styled.h3`
  text-align: center;
  color: #17df14;
  padding: 3rem;
  font-weight: 600;
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  background: #101010;
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #0a3d0c;
  max-width: 400px;
  width: 90%;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  color: #17df14;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ErrorMessage = styled(Alert)`
  margin: 0;
  background: rgba(220, 53, 69, 0.1);
  border-color: #dc3545;
  color: #dc3545;
`;

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;