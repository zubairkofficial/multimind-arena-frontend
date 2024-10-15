import React, { useState, useEffect } from "react";
import Index from './Layout/Index';
import AdminUsers from "./AdminUsers.jsx";
import axios from 'axios';
import Helpers from './../../Config/Helpers';

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch users data using axios
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Helpers.apiUrl}user`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Helpers.getItem("token")}`,
          },
        });
        setUsersData(response.data);
        console.log(response.data); // Assuming response.data is an array of users
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <Index>
        <div style={{ margin: "10rem", marginLeft: "25rem" }}>
          <div className="container">
            <div>Loading users...</div>
          </div>
        </div>
      </Index>
    );
  }

  if (error) {
    return (
      <Index>
        <div style={{ margin: "10rem", marginLeft: "25rem" }}>
          <div className="container">
            <div>Error fetching users: {error.response?.data?.message || error.message}</div>
          </div>
        </div>
      </Index>
    );
  }

  return (
    <Index>
      <div style={{ margin: "10rem", marginLeft: "25rem" }}>
        <div className="container">
          <AdminUsers users={usersData} />
        </div>
      </div>
    </Index>
  );
};

export default AdminDashboard;
