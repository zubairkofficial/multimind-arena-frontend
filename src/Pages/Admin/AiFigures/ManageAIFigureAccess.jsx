import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useGetUsersWithAiFigurePendingStatusQuery, useUpdateAiFigureRequestStatusMutation } from '../../../features/api/userApi';
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';
import Searchbar from "../../../components/Searchbar/Searchbar";
import { AIFigureStatus } from '../../../common';

const ManageAIFigureAccess = () => {
  const notyf = new Notyf();

  // Fetch users data from the API
  const { data: users, isLoading, error,refetch:refetchManageAIFigure } = useGetUsersWithAiFigurePendingStatusQuery();
  const [updateAiFigureAccessStatus] = useUpdateAiFigureRequestStatusMutation();

  const [userDetails, setUserDetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    if (error) {
      notyf.error('Failed to load users');
    }
    if (users) {
      // Map users data to the desired format
      const allUsers = users.map(user => ({
        id: user.id,
        userName: user.username,
        name: user.name,
        accessStatus: user.ManageAIFigureAccess || AIFigureStatus.IN_PROGRESS,  // Default to 'Pending' if no status
      }));
      setUserDetails(allUsers);
    }
  }, [users, error]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // Call API to update the access status
      await updateAiFigureAccessStatus({ userId, status:newStatus }).unwrap();
      refetchManageAIFigure()
      notyf.success(`Access status updated to ${newStatus}!`);

      // Update local state
      setUserDetails((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, accessStatus: newStatus } : user
        )
      );
    } catch (err) {
      notyf.error('Failed to update access status');
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

  const tableHeaders = ["User ID", "Name", "Access Status", "Actions"];
  const tableData = currentUsers.map(user => ({
    "User ID": user.id,
    "Name": user.name,
    "Access Status": user.accessStatus,
    "Actions": (
      <select
        value={user.accessStatus}
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
        <option value={`${AIFigureStatus.PENDING}`}>Pending</option>
        <option value={`${AIFigureStatus.APPROVED}`}>Approved</option>
        <option value={`${AIFigureStatus.REJECTED}`}>Rejected</option>
      </select>
    ),
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container ms-3">
      <Searchbar
        heading="Manage AI Figure Access"
        placeholder="Search by User Name or Name..."
        onSearch={handleSearchChange}
      />
      <div className='manage-arenas overflow-auto' >
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

export default ManageAIFigureAccess;
