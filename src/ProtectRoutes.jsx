import React from "react";
import { Navigate } from "react-router-dom";  // Ensure you import Navigate properly
import { useGetUserByIdQuery } from './features/api/userApi'; // Import the query hook
import { useSelector } from "react-redux";
import { ArenaRequestStatus, UserTier } from "./common";

const ProtectedRoute = ({ children, fallbackPath = "/dashboard" }) => {
  const user = useSelector((state) => state.user.user); // Get user info from Redux store

  const { data: userData, isLoading, error } = useGetUserByIdQuery(user?.id);
  if (isLoading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or loader
  }

  if (error) {
    return <div>Error loading user data</div>;  // Handle error case appropriately
  }

  if (userData?.tier === UserTier.FREE&&(userData?.createArenaRequestStatus!==ArenaRequestStatus.APPROVED||userData?.aiFigureRequestStatus!==ArenaRequestStatus.APPROVED)) {
    return <Navigate to={fallbackPath} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
