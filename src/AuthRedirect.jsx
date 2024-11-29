import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = ({ children }) => {
  const user = useSelector((state) => state.user.user); // Assuming user data is in Redux store

  // If the user is logged in, redirect to the dashboard (or another protected route)
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // If the user is not logged in, show the children (the login/register form)
  return <>{children}</>;
};

export default AuthRedirect;
