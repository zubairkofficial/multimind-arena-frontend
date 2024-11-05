import React, { useState } from "react";

export default function UserListCard({ users, ai }) {
  console.log("Users", users);
  console.log("AI", ai);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAi, setIsAi] = useState(false);

  const handleUserClick = (user, isAi) => {
    setSelectedUser(user);
    setIsAi(isAi);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsAi(false);
  };

  return (
    <div
      className="user-list-card"
      style={{
        padding: "1rem",
        backgroundColor: "#101010",
        borderRadius: "8px",
        display: "flex",
        maxHeight: "80vh",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <h4 style={{ marginBottom: "1rem" }}>Participants</h4>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user, false)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={user.image || "assets/images/logo/logo.png"}
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                  border: "2px solid #00ff00",
                }}
              />
              <span style={{ fontSize: "1.5rem" }}>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <h4 style={{ marginBottom: "1rem" }}>AI Figures</h4>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
          {ai.map((user, index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user, true)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={user.image || "assets/images/logo/logo.png"}
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                  border: "2px solid #00ff00",
                }}
              />
              <span style={{ fontSize: "1.5rem" }}>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div
          className=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content"
            style={{
              padding: "2rem",
              backgroundColor: "#222",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              color: "#fff",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <img
              src={selectedUser.image || "assets/images/logo/logo.png"}
              alt={selectedUser.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
                border: "2px solid #00ff00",
              }}
            />
            <h3>{selectedUser.name}</h3>
            {isAi ? (
              <>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedUser.description || "N/A"}
                </p>
                <button className="btn-default btn-small">Chat Now</button>
              </>
            ) : (
              <>
                <p>
                  <strong>Email:</strong> {selectedUser.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phoneNumber || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
