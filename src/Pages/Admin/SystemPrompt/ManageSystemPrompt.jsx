import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllSystemPromptsQuery,
  useDeleteSystemPromptMutation,
} from "../../../features/api/promptApi"; // Adjust the API slice import
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Preloader from "../../Landing/Preloader";
import Searchbar from "../../../components/Searchbar/Searchbar";

export default function ManageSystemPrompt() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");

  // Fetch system prompts using the RTK query
  const { data: systemPromptsData, error, isLoading } = useGetAllSystemPromptsQuery();
  const [deleteSystemPrompt] = useDeleteSystemPromptMutation(); // Initialize the delete mutation

  const systemPrompts = systemPromptsData || [];

  // Filter system prompts based on search text
  const filteredSystemPrompts = systemPrompts.filter((systemPrompt) =>
    systemPrompt.description.toLowerCase().includes(searchText.toLowerCase()) // Filter by description instead of prompt
  );

  // Pagination calculations
  const indexOfLastSystemPrompt = currentPage * entriesPerPage;
  const indexOfFirstSystemPrompt = indexOfLastSystemPrompt - entriesPerPage;
  const currentSystemPrompts = filteredSystemPrompts.slice(
    indexOfFirstSystemPrompt,
    indexOfLastSystemPrompt
  );
  const totalPages = Math.ceil(filteredSystemPrompts.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleSearchChange = (query) => {
    setSearchText(query); // Update search text
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleCreateSystemPrompt = () => {
    navigate("/admin/system-prompt"); // Adjust the route
  };

  const handleEditSystemPrompt = (systemPrompt) => {
    navigate(`/admin/edit-system-prompt/${systemPrompt.id}`); // Adjust the route
  };

  const handleDeleteSystemPrompt = async (systemPromptId) => {
    if (window.confirm("Are you sure you want to delete this system prompt?")) {
      try {
        await deleteSystemPrompt(systemPromptId).unwrap();
        alert("System prompt deleted successfully.");
      } catch (error) {
        console.error("Failed to delete system prompt:", error);
        alert("Failed to delete system prompt.");
      }
    }
  };

  const tableHeaders = ["Description", "Prompt", "Actions"];

  const tableData = currentSystemPrompts.map((systemPrompt) => ({
    description: systemPrompt.description, // Show description
    prompt: systemPrompt.prompt.length > 50 ? systemPrompt.prompt.substring(0, 50) + "..." : systemPrompt.prompt, // Truncate prompt to 50 characters if needed
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditSystemPrompt(systemPrompt)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleDeleteSystemPrompt(systemPrompt.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  if (isLoading) return <Preloader />;
  if (error) return <div>Error loading system prompts...</div>;

  return (
    <div className="container mx-3">
      <Searchbar
        heading="Manage System Prompts"
        placeholder="Search system prompt..."
        title="Add System Prompt"
        onClick={handleCreateSystemPrompt}
        onSearch={handleSearchChange} // Adding search functionality
      />

      <div className="manage-system-prompts text-light">
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
