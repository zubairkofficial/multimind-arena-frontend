import React, { useState, useEffect } from "react";
import {
  useGetAllBundlesQuery,
  useDeleteBundleMutation,
} from "../../../features/api/bundleApi";
import CustomTable from "../../../components/Table/CustomTable";
import Pagination from "../../../components/Table/Pagination";
import Searchbar from "../../../components/Searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import { Notyf } from "notyf";

const ManageBundle = () => {
  const navigate = useNavigate();
  const notyf = new Notyf(); // For success/error notifications

  const { data: bundlesData = [], error, isLoading, refetch } = useGetAllBundlesQuery();
  const [deleteBundle] = useDeleteBundleMutation();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [bundleIdToDelete, setBundleIdToDelete] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch bundles", error);
      notyf.error("Failed to load bundles. Please try again.");
    }
  }, [error]);

  // Handle loading state and error
  if (isLoading) {
    return <div>Loading bundles...</div>;
  }

  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchText(_.toLower(query)); // Update search text state
  };

  // Filter bundles based on search text
  const filteredData = bundlesData.filter((bundle) =>
    _.includes(_.toLower(bundle.name), searchText) // Ensure you're using the correct field for comparison
  );

  // Handle pagination for filtered data
  const indexOfLastBundle = currentPage * entriesPerPage;
  const indexOfFirstBundle = indexOfLastBundle - entriesPerPage;
  const currentBundles = filteredData.slice(indexOfFirstBundle, indexOfLastBundle);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleAddBundle = () => {
    navigate("/admin/add-bundle-plan");
  };

  const handleShowModal = (bundleId) => {
    setBundleIdToDelete(bundleId);
    setShowModal(true);
  };

  const handleDeleteBundle = async () => {
    if (bundleIdToDelete) {
      try {
        await deleteBundle(bundleIdToDelete).unwrap();
        notyf.success("Bundle deleted successfully!");
        refetch(); // Refetch bundles after deletion
        setBundleIdToDelete(null);
      } catch (err) {
        console.error("Error deleting bundle:", err);
        notyf.error("Failed to delete bundle. Please try again.");
      }
    }
    setShowModal(false);
  };

  const handleEditBundle = (bundle) => {
    navigate("/admin/update-bundle-plan", { state: bundle });
  };

  // Updated headers with "Duration"
  const tableHeaders = ["Label", "Price", "Coins", "Duration", "Actions"];

  // Updated data mapping with "durationInDays"
  const tableData = currentBundles.map((bundle) => ({
    label: bundle.name,
    price: typeof bundle.price === "number" ? `$${bundle.price.toFixed(2)}` : `$${parseFloat(bundle.price).toFixed(2)}`,
    coins: bundle.coins,
    duration: `${bundle.durationInDays} days`, // Map durationInDays
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditBundle(bundle)} // Navigate to edit bundle
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => handleShowModal(bundle.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </>
    ),
  }));

  return (
    <div className="container mx-5">
      <Searchbar
        heading="Manage Bundles"
        title="Add Bundle"
        placeholder="Search Bundles..."
        onClick={handleAddBundle}
        onSearch={handleSearchChange} // Pass the handleSearchChange function
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

      <ConfirmationModal
        title="Confirm Deletion"
        body="Are you sure you want to delete this bundle?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteBundle}
      />
    </div>
  );
};

export default ManageBundle;



