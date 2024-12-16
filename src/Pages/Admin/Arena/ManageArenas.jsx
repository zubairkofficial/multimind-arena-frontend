import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllArenasQuery,
  useDeleteArenaMutation,
} from "./../../../features/api/arenaApi";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import Logo from '../../../../public/assets/images/logo/logo.png';
import styled from 'styled-components';
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";

const Container = styled.div`
  padding: 2rem;
  background: #121212;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #fff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TableWrapper = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Badge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${({ status }) =>
    status === "Open"
      ? "rgba(76, 175, 80, 0.2)"
      : status === "In Progress"
      ? "rgba(255, 193, 7, 0.2)"
      : "rgba(244, 67, 54, 0.2)"};
  color: ${({ status }) =>
    status === "Open"
      ? "#4caf50"
      : status === "In Progress"
      ? "#ffc107"
      : "#f44336"};
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid;
  background: transparent;
  color: ${({ variant }) => (variant === 'edit' ? '#4caf50' : '#f44336')};
  border-color: ${({ variant }) => (variant === 'edit' ? '#4caf50' : '#f44336')};
  margin: 0 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) => (variant === 'edit' ? '#4caf50' : '#f44336')};
    color: white;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`;

export default function ManageArenas() {
  const navigate = useNavigate();
  const { data: arenasData, error, isLoading,refetch:getAllArenas } = useGetAllArenasQuery();
  const [deleteArena,{isLoading:isDeleteArena}] = useDeleteArenaMutation();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [arenaIdToDelete, setArenaIdToDelete] = useState(null); // Store the arena ID to delete

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch arenas", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading arenas...</div>;
  }

  const formattedData = arenasData?.map((arena) => ({
    id: arena.id,
    image: arena.image,
    title: arena?.name,
    type: arena.arenaType?.name || "Unknown",
    aiFigure: arena.arenaAIFigures?.map((fig) => fig.id).join(", ") || "None",
    expirySession: arena.expiryTime
      ? new Date(arena.expiryTime).toLocaleDateString()
      : "No Expiry Time",
    status: arena.status.charAt(0).toUpperCase() + arena.status.slice(1),
    creator: arena.createdBy?.name,
  }));
  const filteredData = formattedData?.filter((item) => {
    const searchLowerCase = searchText.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchLowerCase) ||
      item.type.toLowerCase().includes(searchLowerCase) ||
      item.aiFigure.toLowerCase().includes(searchLowerCase) ||
      item.status.toLowerCase().includes(searchLowerCase);

    const matchesType = filterType ? item.type === filterType : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  const indexOfLastArena = currentPage * entriesPerPage;
  const indexOfFirstArena = indexOfLastArena - entriesPerPage;
  const currentArenas = filteredData?.slice(
    indexOfFirstArena,
    indexOfLastArena
  );
  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateArena = (arena) => {
    navigate('/admin/update-arena',{state:arena})
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1);
  };

  const handleCreateArena = () => {
    navigate("/admin/add-arena");
  };

  const handleDeleteArena = async () => {
    if (arenaIdToDelete) {
      try {
        await deleteArena(arenaIdToDelete).unwrap();
        getAllArenas()
      } catch (error) {
        console.error("Failed to delete arena:", error);
        alert("Failed to delete arena.");
      }
    }
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const tableHeaders = [
    "Image",
    "Arena Name",
    "Type",
    "AI Figure",
    "Expiry Session",
    "Status",
    "Actions",
  ];

  const tableData = currentArenas?.map((arena) => ({
    
    image: (
      <Image
        src={arena.image}
        alt={arena.title}
        onError={(e) => (e.target.src = Logo)}
      />
    ),
    title: arena.title,
    type: arena.type,
    aiFigure: arena.aiFigure,
    expirySession: arena.expirySession ,
    status: <Badge status={arena.status}>{arena.status}</Badge>,
    actions: (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ActionButton variant="edit" onClick={()=>handleUpdateArena(arena)}>
          <i className="fas fa-edit"></i>
        </ActionButton>
        <ActionButton variant="delete" onClick={() => { setArenaIdToDelete(arena.id); setShowDeleteModal(true); }}>
          <i className="fas fa-trash"></i>
        </ActionButton>
      </div>
    ),
  }));

  return (
    <Container>
      <Searchbar
        heading="Manage Arenas"
        title="Create Arena"
        placeholder="Search Arenas..."
        onClick={handleCreateArena}
      />

      <TableWrapper>
        <CustomTable headers={tableHeaders} data={tableData} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesChange={handleEntriesChange}
        />
      </TableWrapper>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        title="Confirm Deletion"
        body="Are you sure you want to delete this arena?"
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteArena}
        isDeleteArena={isDeleteArena}
      />
    </Container>
  );
}
