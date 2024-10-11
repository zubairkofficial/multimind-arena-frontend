import React from "react";

const SystemStatus = () => {
  return (
    <div className="system-status">
      <h2>System Status</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Status</th>
            <th>Last Check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Database</td>
            <td style={{ color: "var(--primary-color)" }}>Operational</td>
            <td>2024-09-29 14:30</td>
          </tr>
          <tr>
            <td>AI Integration</td>
            <td style={{ color: "var(--primary-color)" }}>Operational</td>
            <td>2024-09-29 14:30</td>
          </tr>
          <tr>
            <td>User Authentication</td>
            <td style={{ color: "var(--primary-color)" }}>Operational</td>
            <td>2024-09-29 14:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SystemStatus;