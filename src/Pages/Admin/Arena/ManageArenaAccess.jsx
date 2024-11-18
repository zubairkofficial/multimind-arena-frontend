import React, { useEffect, useState } from 'react';
import { useGetUsersWithPendingStatusQuery, useUpdateArenaRequestStatusMutation } from "../../../features/api/userApi"; // Import the new query for pending status
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';
import { ArenaRequestStatus } from '../../../common'; // Ensure this is imported to check status
import './ManageArenaAccess.css';

const ManageArenaAccess = () => {
  const notyf = new Notyf();

  // Fetching only users with a pending arena access status
  const { data: users, isLoading, error } = useGetUsersWithPendingStatusQuery();
  const [updateArenaRequestStatus] = useUpdateArenaRequestStatusMutation(); // Hook for updating status
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (error) {
      notyf.error('Failed to load users');
    }
    if (users) {
      console.log("users", users?.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        createArenaRequestStatus: user.createArenaRequestStatus,
      })));
      
      const allUsers = users?.map(user => ({
        id: user.id,
        userName: user.username,
        status: user.createArenaRequestStatus || ArenaRequestStatus.STATUS,
        name: user.name,
      }));
      setUserDetails(allUsers);
    }
  }, [users, error]);
  

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Call the mutation to update the status
      const response = await updateArenaRequestStatus({ userId, newStatus }).unwrap();

      // Success notification
      notyf.success(`Request ${newStatus === ArenaRequestStatus.APPROVED ? 'approved' : newStatus === ArenaRequestStatus.REJECTED ? 'rejected' : 'status updated'} successfully!`);

      // Update the status locally in the state after successful API call
      setUserDetails((prevUsers) =>
        prevUsers?.map((user) =>
          user.id === userId
            ? { ...user, status: newStatus }  // Update the status locally
            : user
        )
      );
    } catch (error) {
      // Error handling
      notyf.error('Failed to update the request status');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Pagination logic
  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = userDetails.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userDetails.length / entriesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle entries per page change
  const handleEntriesChange = (newEntriesPerPage) => {
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };

  // Table headers and data
  const tableHeaders = ["User ID", "User Name", "Name", "Arena Request Status", "Actions"];
  const tableData = currentUsers?.map(user => ({
    "User ID": user.id,
    "User Name": user.userName,
    "Name": user.name,
    "Arena Request Status": user.status === ArenaRequestStatus.PENDING
      ? "Pending Approval"
      : user.status === ArenaRequestStatus.APPROVED
      ? "Approved"
      : user.status === ArenaRequestStatus.REJECTED
      ? "Rejected"
      : "Not Requested",
    "Actions": (
      <>
        <select
          value={user.status}
          onChange={(e) => handleStatusChange(user.id, e.target.value)} // Handle status change
          className="form-select"
          style={{
            backgroundColor: "var(--select-bg-color)", 
            color: "var(--select-text-color)", 
            borderColor: "var(--select-border-color)"
          }}
        >
          <option value={ArenaRequestStatus.PENDING}>Pending Approval</option>
          <option value={ArenaRequestStatus.APPROVED}>Approved</option>
          <option value={ArenaRequestStatus.REJECTED}>Rejected</option>
        </select>
      </>
    ),
  }));

  return (
    <div className="container mx-5">
      <h1 className="text-xl mb-5">Manage Arena Access</h1>

      <CustomTable
        headers={tableHeaders}
        data={tableData}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        entriesPerPage={entriesPerPage}
        onEntriesChange={handleEntriesChange}
      />
    </div>
  );
};

export default ManageArenaAccess;
