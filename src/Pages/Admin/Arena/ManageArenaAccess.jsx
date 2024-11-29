import React, { useEffect, useState } from 'react';
import { useGetUsersWithPendingStatusQuery, useUpdateArenaRequestStatusMutation } from "../../../features/api/userApi";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';
import { ArenaRequestStatus } from '../../../common';
import './ManageArenaAccess.css';
import Searchbar from "../../../components/Searchbar/Searchbar";

const ManageArenaAccess = () => {
  const notyf = new Notyf();

  const { data: users, isLoading, error } = useGetUsersWithPendingStatusQuery();
  const [updateArenaRequestStatus] = useUpdateArenaRequestStatusMutation();
  const [userDetails, setUserDetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (error) {
      notyf.error('Failed to load users');
    }
    if (users) {
      const allUsers = users.map(user => ({
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
      const response = await updateArenaRequestStatus({ userId, newStatus }).unwrap();
      notyf.success(`Request ${newStatus === ArenaRequestStatus.APPROVED ? 'approved' : newStatus === ArenaRequestStatus.REJECTED ? 'rejected' : 'status updated'} successfully!`);
      setUserDetails((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, status: newStatus }
            : user
        )
      );
    } catch (error) {
      notyf.error('Failed to update the request status');
    }
  };

  const handleSearchChange = (query) => {
    setSearchText(query);
    setCurrentPage(1); // Reset to the first page when applying a search filter
  };

  const filteredUsers = userDetails.filter(user =>
    user.userName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntriesPerPage) => {
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };

  const tableHeaders = ["User ID",  "Name", " Status", "Actions"];
  const tableData = currentUsers.map(user => ({
    "User ID": user.id,
    "Name": user.name,
    "Arena Request Status": user.status === ArenaRequestStatus.PENDING
      ? "Pending Approval"
      : user.status === ArenaRequestStatus.APPROVED
      ? "Approved"
      : user.status === ArenaRequestStatus.REJECTED
      ? "Rejected"
      : "Not Requested",
    "Actions": (
      <select
        value={user.status}
        onChange={(e) => handleStatusChange(user.id, e.target.value)}
        className=""
        style={{
          borderRadius:"8px",
          
          border:"1px solid #0a3d0c",
          paddingRight:"4px",
          backgroundColor: "#0a3d0c", 
          color: "var(--select-text-color)", 
         
        }}
      >
        <option value={ArenaRequestStatus.PENDING}>Pending Approval</option>
        <option value={ArenaRequestStatus.APPROVED}>Approved</option>
        <option value={ArenaRequestStatus.REJECTED}>Rejected</option>
      </select>
    ),
  }));

  return (
    <div className="container ms-3">
      <Searchbar
        heading="Manage Arena Access"
        placeholder="Search by User Name or Name..."
        onSearch={handleSearchChange}
      />
      <div className='manage-arenas overflow-auto'>
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
    </div>
  );
};

export default ManageArenaAccess;
