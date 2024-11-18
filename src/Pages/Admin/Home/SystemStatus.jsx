import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from './../../../components/Table/CustomTable';

const errorData = [
  {
    path: 'api/v1/users',
    errorMessage: 'Internal Server Error',
    stack: 'Error: Internal Server Error at api/v1/users',
    timestamp: '2024-09-29 14:30',
  },
  {
    path: 'api/v1/auth',
    errorMessage: 'Unauthorized Access',
    stack: 'Error: Unauthorized Access at api/v1/auth',
    timestamp: '2024-09-29 14:25',
  },
  {
    path: 'api/v1/data',
    errorMessage: 'Data Not Found',
    stack: 'Error: Data Not Found at api/v1/data',
    timestamp: '2024-09-29 14:20',
  },
];

const SystemStatus = () => {
  const navigate = useNavigate();

  // Define the table headers
  const tableHeaders = ['Path', 'Error Message', 'Stack', 'Timestamp'];

  // Map the error data to match the structure expected by CustomTable
  const tableData = errorData.map((item) => ({
    Path: item.path,
    'Error Message': item.errorMessage,
    Stack: item.stack,
    Timestamp: item.timestamp,
  }));

  // Function to handle row click
  const handleRowClick = () => {
    navigate('/admin/system-status');
  };

  return (
    <div className="row mb-4" onClick={handleRowClick}>
      <div className="col-md-12">
        <div className="card system-status-card">
          <h4 className="card-header">Error History</h4>
          <div className="card-body">
            <CustomTable
              headers={tableHeaders}
              data={tableData}
              showSearch={false}
              pagination={false}
               // Pass row click handler
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
