import React, { useState, useEffect } from "react";
import Helpers from "./../../../Config/Helpers"; // Adjust the import path based on your project structure
import "./AdminUsers.css"; // Import the custom CSS file
import Preloader from "../../Landing/Preloader";
import CustomTable from './../../../components/Table/CustomTable'; // Reuse the CustomTable component
import Pagination from './../../../components/Table/Pagination'; // Reuse the Pagination component
import { useGetAllUsersQuery } from "./../../../features/api/userApi"; // Import the hook for getting all users
import Searchbar from "../../../components/Searchbar/Searchbar";
const AdminUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Set the number of entries per page
  const [searchText, setSearchText] = useState(""); // Search state

  const { data: allUsers, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (allUsers) {
      setUsersData(allUsers);
    }
  }, [allUsers]);

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  if (error) {
    return <div>Error fetching users: {error.message}</div>;
  }

  // Filter users based on searchText for both name and email
  const filteredUsers = usersData.filter((user) => {
    const searchLowerCase = searchText.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLowerCase) ||
      user.email?.toLowerCase().includes(searchLowerCase)
    );
  });

  // Pagination logic
  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle entries per page change
  const handleEntriesChange = (newEntriesPerPage) => {
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1); // Reset to the first page when entries per page changes
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Table headers and data
  const tableHeaders = ["Sr. No", "Name", "Email", "Actions"];
  const tableData = currentUsers.map((user, index) => ({
    "Sr. No": index + 1,
    Name: user.name || "N/A",
    Email: user.email || "N/A",
    Actions: (
     <>
        <button className="btn btn-sm btn-outline-success me-2">
          <i className="fas fa-edit"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
         <Searchbar heading="Manage Users" placeholder="Search user..."/>
          <CustomTable
            headers={tableHeaders}
            data={tableData}
             // No need for internal search since we handle it here
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            entriesPerPage={entriesPerPage}
            onEntriesChange={handleEntriesChange}
          />
        </div>
      )}
    </>
  );
};

export default AdminUsers;
