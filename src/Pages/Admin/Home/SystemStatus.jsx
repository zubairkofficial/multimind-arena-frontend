import React from 'react';
import CustomTable from './../../../components/Table/CustomTable'; // Import the reusable CustomTable component

const statusData = [
  {
    component: 'Database',
    status: 'Operational',
    lastCheck: '2024-09-29 14:30',
  },
  {
    component: 'API Server',
    status: 'Operational',
    lastCheck: '2024-09-29 14:25',
  },
  {
    component: 'Authentication Service',
    status: 'Operational',
    lastCheck: '2024-09-29 14:20',
  },
];

const SystemStatus = () => {
  // Define the table headers
  const tableHeaders = ['Component', 'Status', 'Last Check'];

  // Map the status data to match the structure expected by CustomTable
  const tableData = statusData.map((item) => ({
    Component: item.component,
    Status: item.status,
    'Last Check': item.lastCheck,
  }));

  return (
    <div className="row mb-4">
      <div className="col-md-12">
        <div className="card system-status-card">
          <h4 className="card-header">System Status</h4>
          <div className="card-body">
            {/* Use CustomTable without pagination */}
            <CustomTable
              headers={tableHeaders}
              data={tableData}
              showSearch={false} // No search needed
              pagination={false} // Disable pagination
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
