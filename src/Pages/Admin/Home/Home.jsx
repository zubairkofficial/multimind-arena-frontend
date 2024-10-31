import React from "react";
import "./Home.css";
import AdminCards from "./AdminCards";
import RecentActivities from "./RecentActivities";
import SystemStatus from "./SystemStatus";
import { useGetAllUsersQuery } from "./../../../features/api/userApi";
import { useGetAllArenaTypesQuery } from "./../../../features/api/arenaApi"; // Adjust path as necessary
import { useGetAllAIFiguresQuery } from "./../../../features/api/aiFigureApi"; // Adjust path as necessary
import { useGetAllArenasQuery } from "./../../../features/api/arenaApi";
const Home = () => {
  const { data: allUsers, error: userError, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const { data: allArena, error: arenaError, isLoading: isLoadingArenas } = useGetAllArenasQuery();
  const { data:allArenaTypes, error:arenaTypesError, isLoading: isLoadingArenaTypes } = useGetAllArenaTypesQuery();
  const { data: allAIFigures, error: aiError, isLoading: isLoadingAIFigures } = useGetAllAIFiguresQuery();

  // Extract the lengths of the data
  const userCount = allUsers ? allUsers.length : 0;
  const arenaTypesCount = allArenaTypes ? allArenaTypes.length : 0;
  const arenaCount = allArena ? allArena.length : 0;
  const aiFiguresCount = allAIFigures ? allAIFigures.length : 0;

  // Loading state
  if (isLoadingUsers || isLoadingArenas || isLoadingAIFigures ||  isLoadingArenaTypes) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Error handling
  if (userError) {
    return <div>Error loading users: {userError.message}</div>; 
  }
  if (arenaError) {
    return <div>Error loading arena types: {arenaError.message}</div>; 
  }
  if (aiError) {
    return <div>Error loading AI figures: {aiError.message}</div>; 
  }
  if (arenaTypesError) {
    return <div>Error loading AI figures: {aiError.message}</div>; 
  }
  return (
    <div className="admin-dashboard-container container mt-4">
      <AdminCards 
        userCount={userCount} 
        arenaCount={arenaCount} 
        aiFiguresCount={aiFiguresCount} 
        arenaTypesCount={arenaTypesCount}
      /> {/* Pass counts as props */}
      <RecentActivities />
      <SystemStatus />
    </div>
  );
};

export default Home;
