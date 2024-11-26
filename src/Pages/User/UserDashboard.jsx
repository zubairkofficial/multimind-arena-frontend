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
import { FaUser } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
import { Link } from 'react-router-dom';




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
    // {
    //   title: "Total Coins",
    //   count: 8,
    //   className: "daily-active-users-card",
    //   path: "/admin/users",
    //   userIcon: <FaUser />,
    // },
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
    <div className="container">
    
      <div className="arena-dashboard">
        <div className="search-bar-section">
          <SearchBar
            onClick={() => navigate(userData?.tier===UserTier.PREMIUM?"/add-arena": userData?.createArenaRequestStatus === ArenaRequestStatus.APPROVED ? "/add-arena" : "/request-arena")}
            heading={`Welcome to Arena1, ${userData?.name}`}
            title="Create Arena "
            placeholder="Search for arenas..."
            style={{fontSize:"2.4rem"}}
            isPremium={userData.tier===UserTier.FREE}
          />
        </div>
        <div className="row mb-4">
     {cardsData.map((card, index) => (
        <div className="col-md-3" key={index}>
        <Link to={card.path}>
          {/* admin-card card*/}
          <div className={`text-white card-glass ${card.className}`}>
            {/* card-body */}
            <div className="card-body d-flex align-items-center">
              <div className="ls">
                {card.userIcon}
              </div>
              <div className="rs ms-3">
                <h5 className="card-title">{card.title}</h5>
                <h2 className="card-text text-center">{card.count}</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
      ))}
     </div>

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
          <h3 className="d-flex align-items-center justify-content-center">
            No arenas available
          </h3>
        )}

        {(isJoining || showOverlay) && (
          <OverlayCard isJoining={isJoining} joinError={joinError} />
        )}

        {notification && (
          <div className="notification">
            <Alert variant="info">{notification}</Alert>
          </div>
        )}
      </div>
    </div>
  );
}

const OverlayCard = ({ isJoining, joinError }) => (
  <div className="overlay p-4 rounded">
    <div className="overlay-card text-center p-4">
      <div className="bg-dark text-white p-4">
        {/* Show joining state only if isJoining is true and no joinError */}
        {isJoining && !joinError && (
          <>
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div>Joining the arena...</div>
          </>
        )}

        {/* Show error state only if joinError exists */}
        {joinError && (
          <Alert variant="danger" className="mt-3">
            {joinError}
          </Alert>
        )}
      </div>
    </div>
  </div>
);