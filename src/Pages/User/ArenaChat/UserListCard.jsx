import React from "react";

const users = [
  { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' },
  { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' },
  { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' },
];
const ai = [
  { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' },
  { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' }, { name: 'Ali' },
  { name: 'Ali' }, { name: 'Ali' },
];

export default function UserListCard(users,ai) {
  const lastestUser = users.users;
  const latestAi = users.ai;
  console.log("Users" ,users)
  console.log("AIs" ,)
  return (
    <div className="user-list-card"
      style={{
        padding: "1rem",
        backgroundColor: "#101010",
        borderRadius: "8px",
       // Set a fixed height for the container
        display: "flex",
        maxHeight: '80vh',
        flexDirection: "column",
        color: "#fff"
      }}
    >
      <h4 style={{ marginBottom: "1rem" }}>Participants</h4>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: "1rem",
        }}
      >
        <ul className='list-unstyled' style={{ padding: 0, margin: 0, maxHeight:'70%' }}>
          {lastestUser.map((user, index) => (
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
              <span style={{ fontSize: "1.5rem" }}>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <h4 style={{ marginBottom: "1rem" }}>AI Figures</h4>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <ul className='list-unstyled' style={{ padding: 0, margin: 0 }}>
          {latestAi.map((user, index) => (
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
              <span style={{ fontSize: "1.5rem" }}>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
