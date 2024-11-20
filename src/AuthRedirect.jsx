import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "./features/api/authSlice"; // Import the Redux action to set token

const AuthRedirect = ({ children, redirectPath = "/dashboard" }) => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in localStorage if not in Redux
    if (!token) {
      const localStorageToken = localStorage.getItem("token");
      if (localStorageToken) {
        dispatch(setToken(localStorageToken)); // Update Redux state with token from localStorage
      }
    }
  }, [token, dispatch]);

  // Prevent redirect loop if token doesn't exist
  if (token || localStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />; // Redirect if token exists
  }

  return children; // Render the children component if no token
};

export default AuthRedirect;
