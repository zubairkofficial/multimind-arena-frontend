import React, { useState, useEffect } from "react";
import Index from "./Layout/Index";
import axios from "axios";
import Helpers from "./../../Config/Helpers";
import Preloader from "../Landing/Preloader";

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  return (
    <div className="container">
      {/* Pass usersData to AdminUsers using the 'users' prop */}
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
