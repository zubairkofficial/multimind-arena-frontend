// UserListCard.js
import React from "react";
import "./../../../components/ArenaChat/arenachat.css"; // Add custom styling here

export default function UserListCard({ users }) {
  return (
    <div className="user-list-card">
      <h4 className="user-list-title">Participants</h4>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-list-item">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
