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

export default function UserDashboard() {
  const { data: arenas, error, isLoading, refetch } = useGetAllArenasQuery();
  const [showOverlay, setShowOverlay] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [notification, setNotification] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user.id);
  const isMounted = useRef(true);

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
      response && navigate(`/arena-chat/${response.id}`, { state: response });
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
          { arenaId: arena.id, userId },
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
    const type = arena.arenaType.name;
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
            onClick={() => navigate("/add-arena")}
            heading="Join Arena Now"
            title="Create Arena"
            placeholder="Search for arenas..."
          />
        </div>

        {arenas?.length > 0 ? (
          <>
            <ArenaCategory
              title="All Arenas"
              arenas={arenas}
              handleJoin={handleJoinArena}
            />
            {sortedArenaCategories.map(([type, arenasList]) => (
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