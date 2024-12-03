import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useGetAllUsersQuery } from "../../../features/api/userApi";
import CustomTable from '../../../components/Table/CustomTable';
import Pagination from '../../../components/Table/Pagination';
import Preloader from "../../Landing/Preloader";
import Searchbar from "../../../components/Searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";

const AdminContainer = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TableSection = styled.div`
  background: rgba(18, 18, 18, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid;
  background: transparent;
  color: ${props => props.variant === 'edit' ? '#4caf50' : '#f44336'};
  border-color: ${props => props.variant === 'edit' ? '#4caf50' : '#f44336'};
  margin: 0 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'edit' ? '#4caf50' : '#f44336'};
    color: white;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.6);
`;

const AdminUsers = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: allUsers, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (allUsers) {
      setUsersData(allUsers);
    }
  }, [allUsers]);

  const handleEdit = (user) => {
    console.log("Edit user:", user);
    navigate("/admin/users/update",{ state: user })
  };

  const handleDelete = (user) => {
    setShowModal(true);
   
    console.log("Delete user:", user);
  };

  const filteredUsers = usersData.filter((user) => {
    const searchLowerCase = searchText.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLowerCase) ||
      user.email?.toLowerCase().includes(searchLowerCase)
    );
  });

  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  const tableHeaders = ["ID", "Name", "Email", "Status", "Actions"];
  const tableData = currentUsers.map((user, index) => ({
    ID: indexOfFirstUser + index + 1,
    Name: user.name || "N/A",
    Email: user.email || "N/A",
    Status: (
      <span className={`badge ${user.active ? 'bg-success' : 'bg-danger'}`}>
        {user.active ? 'Active' : 'Inactive'}
      </span>
    ),
    Actions: (
      <ActionButtons>
        <ActionButton 
          variant="edit" 
          onClick={() => handleEdit(user)}
          title="Edit User"
        >
          <i className="fas fa-edit" />
        </ActionButton>
        <ActionButton 
          variant="delete" 
          onClick={() => handleDelete(user)}
          title="Delete User"
        >
          <i className="fas fa-trash" />
        </ActionButton>
      </ActionButtons>
    ),
  }));

  if (error) {
    return (
      <NoDataMessage>
        Error fetching users: {error.message}
      </NoDataMessage>
    );
  }

  return (
    <AdminContainer>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Searchbar 
            heading="Manage Users" 
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
          
          <TableSection>
            <CustomTable
              headers={tableHeaders}
              data={tableData}
              showSearch={false}
            />
            
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              entriesPerPage={entriesPerPage}
              onEntriesChange={(value) => {
                setEntriesPerPage(value);
                setCurrentPage(1);
              }}
            />
          </TableSection>
        </>
      )}
       {/* <ConfirmationModal
    title="Confirm Deletion"
    body="Are you sure you want to delete this bundle?"
    show={showModal}
    onClose={() => setShowModal(false)}
    onConfirm={handleDelete}
  /> */}
    </AdminContainer>
  );
};

export default AdminUsers;
