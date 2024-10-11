import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "./AdminDashboard.css";

const Sidebar = () => {
  return (
    <aside className="sidebar stickys">
      <Button variant="primary" className="sidebar-create-button mb-3">+ Create</Button>
      <ListGroup variant="flush" className="sidebar-list">
        <ListGroup.Item action href="#dashboard" className="sidebar-item">
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item action href="#users" className="sidebar-item">
          User Management
        </ListGroup.Item>
        <ListGroup.Item action href="#arenas" className="sidebar-item">
          Arena Management
        </ListGroup.Item>
        <ListGroup.Item action href="#ai-figures" className="sidebar-item">
          AI Figure Management
        </ListGroup.Item>
        <ListGroup.Item action href="#reports" className="sidebar-item">
          Reports
        </ListGroup.Item>
        <ListGroup.Item action href="#settings" className="sidebar-item">
          System Settings
        </ListGroup.Item>
      </ListGroup>
    </aside>
  );
};

export default Sidebar;