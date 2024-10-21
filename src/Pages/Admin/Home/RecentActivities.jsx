import React from 'react';
import CustomTable from './../../../components/Table/CustomTable'; // Import the reusable CustomTable component

const activitiesData = [
  {
    time: '2024-09-29 14:23',
    event: 'New User Registration',
    details: 'Username: PhiloSophia22',
    actionText: 'View Profile',
    btnClass: 'view-profile-btn',
  },
  {
    time: '2024-09-29 14:15',
    event: 'Arena Created',
    details: 'Name: The Great Scientific Debate',
    actionText: 'Manage Arena',
    btnClass: 'manage-arena-btn',
  },
  {
    time: '2024-09-29 14:02',
    event: 'Reported Message',
    details: 'Arena: Philosophy 101',
    actionText: 'Review',
    btnClass: 'review-btn',
  },
  {
    time: '2024-09-29 13:55',
    event: 'AI Figure Added',
    details: 'Name: Marie Curie',
    actionText: 'Edit AI',
    btnClass: 'edit-ai-btn',
  },
];

const RecentActivities = () => {
  // Define table headers
  const tableHeaders = ['Time', 'Event', 'Details', 'Action'];

  // Map activitiesData to match the CustomTable format
  const tableData = activitiesData.map((activity) => ({
    Time: activity.time,
    Event: activity.event,
    Details: activity.details,
    Action: (
      <button className={`btn btn-sm ${activity.btnClass}`}>
        {activity.actionText}
      </button>
    ),
  }));

  return (
    <div className="row mb-4">
      <div className="col-md-12">
        <div className="card recent-activities-card">
          <h4 className="card-header">Recent Activities</h4>
          <div className="card-body">
            {/* Use CustomTable without pagination */}
            <CustomTable
              headers={tableHeaders}
              data={tableData}
              showSearch={false} // Disable search for recent activities
              pagination={false} // Disable pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
