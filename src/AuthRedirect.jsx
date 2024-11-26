import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setToken } from "./features/api/authSlice";

const AuthRedirect = ({ children, redirectPath = "/dashboard" }) => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux
  const dispatch = useDispatch();
  const [shouldRedirect, setShouldRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (token || localStorageToken) {
      // If token exists in Redux or localStorage, ensure Redux state is synced
      if (!token && localStorageToken) {
        dispatch(setToken(localStorageToken));
      }
      setShouldRedirect(true); // Trigger redirection
    } else {
      setShouldRedirect(false); // Prevent redirect if no token
    }
  }, [token, dispatch]);

  // Redirect if token is valid
  if (shouldRedirect) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render children if not redirecting
  return <>{children}</>;
};

export default AuthRedirect;
