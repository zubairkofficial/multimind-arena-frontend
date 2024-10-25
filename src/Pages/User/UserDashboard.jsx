import React, { useState } from "react";
import {
  useGetAllArenasQuery,
  useJoinArenaMutation,
} from "../../features/api/arenaApi"; // Import the hooks
import ArenaCategory from "../../components/Arenas/ArenaCategory";
import "./../../components/Arenas/arenas.css";
import { useNavigate } from "react-router";
import { Modal, Spinner, Alert } from "react-bootstrap"; // Import Modal, Spinner, and Alert from React Bootstrap
import Preloader from "../../Pages/Landing/Preloader"; // Import Preloader component

export default function UserDashboard() {
  const { data: arenas, error, isLoading } = useGetAllArenasQuery();
  const navigate = useNavigate();

  // Hook for joining an arena
  const [joinArena, { isLoading: isJoining }] = useJoinArenaMutation();

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [joinError, setJoinError] = useState(null); // State to store error message

  const handleJoinArena = async (arena) => {
    if (!arena) {
      console.error("Arena data is missing or undefined!");
      return;
    }

    try {
      // Reset error and show the modal when joining starts
      setJoinError(null);
      setShowModal(true);
      // Join the arena by sending the arena ID
      const response = await joinArena(arena.id).unwrap();

      // Close the modal and navigate to the arena chat after joining
      setShowModal(false);
      navigate(`/arena-chat/${arena.id}`, { state: response });
    } catch (error) {
      console.error("Error joining arena:", error);
      setJoinError(error?.data.message || "Failed to join the arena."); // Set error message
      setShowModal(true); // Keep the modal open to show the error message
    }
  };

  if (isLoading) {
    return <Preloader />; // Display Preloader while loading
  }

  if (error) {
    return <div>Error loading arenas: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="arena-dashboard">
        {arenas && arenas.length > 0 ? (
          <>
            <ArenaCategory
              title="All Arenas"
              arenas={arenas} // Pass the fetched arenas data
              cardSize="small"
              handleJoin={handleJoinArena}
            />

            {/* Modal for "Joining the arena" or showing error */}
            <Modal show={isJoining || showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Body className="text-center bg-dark text-white">
                {/* Show spinner if loading */}
                {isJoining && (
                  <>
                    <Spinner animation="border" role="status" className="mb-3">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div>Joining the arena...</div>
                  </>
                )}
                {/* Show error message if there is any */}
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
