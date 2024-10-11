import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./AdminDashboard.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const sidebarItems = [
    { name: "Dashboard", to: "/admin/dashboard" },
    { name: "User Management", to: "/admin/users" },
    { name: "Arena Management", to: "/admin/arenas" },
    { name: "AI Figure Management", to: "/admin/ai-figures" },
    { name: "Reports", to: "/admin/reports" },
    { name: "System Settings", to: "/admin/settings" },
  ];

  const sidebarStyles = {
    position: 'fixed',
    top: 60,
    left: 0,
    bottom: 0,
    width: isCollapsed ? '0px' : '250px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const toggleButtonStyles = {
    position: 'relative',
    top: '10px',
    right: isCollapsed ? '-10px' : '-100px',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '36px',
    cursor: 'pointer',
    zIndex: 1001,
    borderRadius: '100%',
    transition: 'background 0.3s ease',
  };

  const createButtonStyles = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const sidebarListStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    overflowY: 'auto',
  };

  const sidebarItemStyles = {
    padding: '15px 20px',
    borderBottom: '1px solid #2c2c2c',
    transition: 'background-color 0.2s',
  };

  const sidebarLinkStyles = {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    fontSize: '16px',
  };

  return (
    <aside style={sidebarStyles}>
      <button
        style={toggleButtonStyles}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={(e) => (e.target.style.background = 'gray')}
        onMouseLeave={(e) => (e.target.style.background = 'none')}
      >
        {isCollapsed ? <Menu /> : <X />}
      </button>
      {!isCollapsed && (
        <>
          <button style={createButtonStyles}>+ Create</button>
          <ul style={sidebarListStyles}>
            {sidebarItems.map((item, index) => (
              <li key={index} style={sidebarItemStyles}>
                <Link to={item.to} style={sidebarLinkStyles}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;