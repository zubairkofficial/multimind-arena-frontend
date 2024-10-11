// RecentActivities.js
import React from "react";

const RecentActivities = () => {
  return (
    <div className="recent-activities">
      <h2>Recent Activities</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-09-29 14:23</td>
            <td>New User Registration</td>
            <td>Username: PhiloSophia22</td>
            <td><button className="action-button">View Profile</button></td>
          </tr>
          <tr>
            <td>2024-09-29 14:15</td>
            <td>Arena Created</td>
            <td>Name: The Great Scientific Debate</td>
            <td><button className="action-button">Manage Arena</button></td>
          </tr>
          <tr>
            <td>2024-09-29 14:02</td>
            <td>Reported Message</td>
            <td>Arena: Philosophy 101</td>
            <td><button className="action-button">Review</button></td>
          </tr>
          <tr>
            <td>2024-09-29 13:55</td>
            <td>AI Figure Added</td>
            <td>Name: Marie Curie</td>
            <td><button className="action-button">Edit AI</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivities;