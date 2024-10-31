// UserListCard.js
import React from "react";

export default function UserListCard({ users }) {
  return (
    <div className="user-list-card"
      style={{
        padding: "1rem",
        backgroundColor: "#f101010",
        borderRadius: "8px",
      }}
    >
      <h4 style={{ marginBottom: "1rem" }}>Participants</h4>
      <ul  className='list-unstyled' style={{  padding: 0, margin: 0 }}>
        {users.map((user, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={user.image || "assets/images/logo/logo.png"}
              alt={user.name}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px',
                border: '2px solid #00ff00',
              }}
            />
            <span style={{ fontSize: "1.5rem", color: "#fff" }}>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
