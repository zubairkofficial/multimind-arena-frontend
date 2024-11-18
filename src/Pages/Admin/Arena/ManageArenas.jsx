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

export default function ManageArenas() {
  const navigate = useNavigate();
  const { data: arenasData, error, isLoading } = useGetAllArenasQuery();
  const [deleteArena] = useDeleteArenaMutation(); // Initialize the delete mutation
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const arenaTypes = ["Debate", "Game", "Casual Chat"];
  const statuses = ["Open", "In Progress", "Full"];

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch arenas", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading arenas...</div>;
  }

  // Format data for the table
  const formattedData = arenasData?.map((arena) => ({
    id: arena.id,
    image: arena.image,
    title: arena.name,
    type: arena.arenaType?.name || "Unknown",
    aiFigure: arena.arenaAIFigures?.map((fig) => fig.id).join(", ") || "None",
    expirySession: arena.expiryTime
      ? new Date(arena.expiryTime).toLocaleDateString()
      : "N/A",
    status: arena.status.charAt(0).toUpperCase() + arena.status.slice(1),
    creator: arena.createdBy.name,
  }));

  // Modify the filtering logic to search across multiple fields
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

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1);
  };

  const handleCreateArena = () => {
    navigate("/admin/add-arena");
  };

  const handleDeleteArena = async (arenaId) => {
    if (window.confirm("Are you sure you want to delete this arena?")) {
      try {
        await deleteArena(arenaId).unwrap();
        alert("Arena deleted successfully.");
      } catch (error) {
        console.error("Failed to delete arena:", error);
        alert("Failed to delete arena.");
      }
    }
  };

  const tableHeaders = [
    "Image",
    "Arena Name",
    "Type",
    "AI Figure",
    "Expiry Session",
    "Status",
    "Creator",
    "Actions",
  ];
  const tableData = currentArenas?.map((arena) => ({
    image: (
      <img
        src={arena.image}
        alt={arena.title}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        onError={(e) => e.target.src = Logo} // Fallback to Logo if the image fails to load

      />
    ),
    title: arena.title,
    type: arena.type,
    aiFigure: arena.aiFigure,
    expirySession: arena.expiryTime ? arena.expiryTime : "No Expiry Time",
    status: (
      <span
        className={`badge ${
          arena.status === "Open"
            ? "bg-success"
            : arena.status === "In Progress"
            ? "bg-warning"
            : "bg-danger"
        }`}
      >
        {arena.status}
      </span>
    ),
    creator: arena.creator,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          // onClick={() => navigate(`/admin/edit-arena/${arena.id}`)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDeleteArena(arena.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage Arenas"
        title="Create Arena"
        placeholder="Search Arenas..."
        onClick={handleCreateArena}
      />

      <div className="manage-arenas text-light">
        <CustomTable headers={tableHeaders} data={tableData} />

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
}
