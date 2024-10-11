import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const Sidebar = () => {
  const sidebarItems = [
    { name: "Dashboard", to: "/admin/dashboard" },
    { name: "User Management", to: "/admin/users" },
    { name: "Arena Management", to: "/admin/arenas" },
    { name: "AI Figure Management", to: "/admin/ai-figures" },
    { name: "Reports", to: "/admin/reports" },
    { name: "System Settings", to: "/admin/settings" },
  ];

  return (
    <aside className="sidebar stickys">
      <Button variant="primary" className="sidebar-create-button mb-3">
        + Create
      </Button>
      <ListGroup variant="flush" className="sidebar-list">
        {sidebarItems.map((item, index) => (
          <ListGroup.Item key={index} className="sidebar-item">
            <Link to={item.to} className="sidebar-link">
              {item.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </aside>
  );
};

export default Sidebar;
