import React from "react";
import Helpers from './../Config/Helpers'
import { Navigate } from "react-router";

const Auth = ({ children, isAuth = true, isAdmin = false }) => {
    let user = Helpers.getItem("user", true);
    let token = Helpers.getItem("token");
    let loginTime = Helpers.getItem("loginTimestamp");
  
    // Get current time
    let currentTime = new Date().getTime();
  
    // Check if loginTime exists and calculate the minutes passed
    if (loginTime) {
      let minutesPassed = Math.floor((currentTime - loginTime) / (1000 * 60));
  
      // Session expiration check: Expire after 30 minutes
      if (minutesPassed > 60) {
        localStorage.clear();
        Helpers.toast(
          "error",
          "Session expired. Please login again to continue."
        );
        return <Navigate to="/login" />;
      }
    }
  
    // For protected routes
    if (isAuth) {
      // If no user or token found, redirect to login
      if (!user || !token) {
        Helpers.toast("error", "Please login to continue");
        return <Navigate to="/login" />;
      }
  
      // Ensure only admins can access admin routes
      if (isAdmin && parseInt(user.isAdmin) !== true) {
        Helpers.toast("error", "Access denied. Only admin allowed.");
        return <Navigate to="/" />;
      }
  
      // Ensure admins cannot access user routes
      if (!isAdmin && parseInt(user.isAdmin) === true) {
        Helpers.toast(
          "error",
          "Access denied. Admins cannot access user routes."
        );
        return <Navigate to="/admin/dashboard" />;
      }
  
      // If all checks pass, render the children
      return children;
    }
    // For non-protected routes like /login
    else {
      if (user && token) {
        if (user.user_type === 1) {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/" />;
        }
      }
      return children;
    }
  };
  export default Auth;