import React, { useState } from "react";
import {
  useGetAllArenasQuery,
  useJoinArenaMutation,
} from "../../features/api/arenaApi";
import ArenaCategory from "../../components/Arenas/ArenaCategory";
import SearchBar from "../../components/Searchbar/Searchbar"; // Import the SearchBar component
import "./../../components/Arenas/arenas.css";
import { useNavigate } from "react-router";
import { Modal, Spinner, Alert } from "react-bootstrap";
import Preloader from "../../Pages/Landing/Preloader";

export default function UserDashboard() {
  const { data: arenas, error, isLoading } = useGetAllArenasQuery();
  const navigate = useNavigate();

  const [joinArena, { isLoading: isJoining }] = useJoinArenaMutation();
  const [showModal, setShowModal] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const handleJoinArena = async (arena) => {
    if (!arena) {
      console.error("Arena data is missing or undefined!");
      return;
    }

    try {
      setJoinError(null);
      setShowModal(true);
      const response = await joinArena(arena.id).unwrap();
      setShowModal(false);
      navigate(`/arena-chat/${arena.id}`, { state: response });
    } catch (error) {
      console.error("Error joining arena:", error);
      setJoinError(error?.data.message || "Failed to join the arena.");
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Error loading arenas: {error.message}</div>;
  }

  // Group arenas by their types
  const arenasByType = arenas.reduce((acc, arena) => {
    const type = arena.arenaType.name;
    if (!acc[type]) acc[type] = [];
    acc[type].push(arena);
    return acc;
  }, {});
  const handleAddArena = () => {
    navigate("/add-arena");
  };

  // Convert grouped arenas to an array and sort by length in descending order
  const sortedArenaCategories = Object.entries(arenasByType)
    .sort((a, b) => b[1].length - a[1].length); // Sort by number of arenas in descending order

  return (
    <div className="container">
      <div className="arena-dashboard">
        {/* Search Bar Section */}
        <div className="search-bar-section">
          <h2 className="dashboard-title">Find Your Arena</h2>
          <SearchBar
          onClick={handleAddArena}
          title="+ Create Arena"
          placeholder="Search for arenas..." />
        </div>

        {arenas && arenas.length > 0 ? (
          <>
            {/* All Arenas Carousel */}
            <ArenaCategory
              title="All Arenas"
              arenas={arenas} // Display all arenas together
              handleJoin={handleJoinArena}
            />

            {/* Sorted Arena Categories */}
            {sortedArenaCategories.map(([type, arenasList]) => (
              <ArenaCategory
                key={type}
                title={type} // Set the title to the arena type name
                arenas={arenasList} // Pass arenas of the current type
                handleJoin={handleJoinArena}
              />
            ))}

            {/* Modal for "Joining the arena" or showing error */}
            <Modal show={isJoining || showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Body className="text-center bg-dark text-white">
                {isJoining && (
                  <>
                    <Spinner animation="border" role="status" className="mb-3">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div>Joining the arena...</div>
                  </>
                )}
                {joinError && (
                  <Alert variant="danger" className="mt-3">
                    {joinError}
                  </Alert>
                )}
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <div>No arenas available</div>
        )}
      </div>
    </div>
  );
}
