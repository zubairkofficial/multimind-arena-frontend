// Header.js
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="logo">MultiMind Arena</div>
      <div className="admin-info">
        Welcome, Admin |{" "}
        <Link onClick={handleLogout} style={{ color: "var(--primary-color)" }}>
          Logout
        </Link>
      </div>
    </header>
  );
};
export default Header;
