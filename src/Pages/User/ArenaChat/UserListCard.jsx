import React, { useState } from "react";
import Logo from "../../../../public/assets/images/logo/logo.png";

export default function UserListCard({ users, ai }) {
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
        overflow: "hidden",
        width: "100%",
      }}
    >
      <h4 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Participants</h4>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
          {users?.map((user, index) => (
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
                src={user.image || Logo}
                alt={user?.name}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                  border: "2px solid #00ff00",
                }}
                onError={(e) => (e.target.src = Logo)}
              />
              <span style={{ fontSize: "0.9rem" }}>{user?.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <h4 style={{ marginBottom: "1rem", fontSize: "1rem" }}>AI Figures</h4>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <ul className="list-unstyled" style={{ padding: 0, margin: 0 }}>
          {ai?.map((user, index) => (
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
                src={user?.image || Logo}
                alt={user?.name}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                  border: "2px solid #00ff00",
                }}
                onError={(e) => (e.target.src = Logo)}
              />
              <span style={{ fontSize: "0.9rem" }}>{user?.name}</span>
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
            zIndex: 999,
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content"
            style={{
              padding: "1.5rem",
              backgroundColor: "#222",
              borderRadius: "8px",
              maxWidth: "90%",
              width: "100%",
              color: "#fff",
              position: "relative",
              textAlign: "center",
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
              src={selectedUser.image || Logo}
              alt={selectedUser.name}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
                border: "2px solid #00ff00",
              }}
              onError={(e) => (e.target.src = Logo)}
            />
            <h3 style={{ fontSize: "1rem" }}>{selectedUser.name}</h3>
            {isAi ? (
              <>
                <p style={{ fontSize: "0.9rem" }}>
                  <strong>Description:</strong>{" "}
                  {selectedUser.description || "N/A"}
                </p>
                <button
                  className="btn-default btn-small"
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                  }}
                >
                  Chat Now
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "0.9rem" }}>
                  <strong>Email:</strong> {selectedUser.email || "N/A"}
                </p>
                <p style={{ fontSize: "0.9rem" }}>
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
