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

const ManageBundle = () => {
  const navigate = useNavigate();
  const { data: bundlesData, error, isLoading, refetch } = useGetAllBundlesQuery();
  const [deleteBundle] = useDeleteBundleMutation();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  
  const [showModal, setShowModal] = useState(false);
  const [bundleIdToDelete, setBundleIdToDelete] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch bundles", error);
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading bundles...</div>;
  }

  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchText(_.toLower(query)); // Update search text state
  };

  // Filter bundles based on search text
  const filteredData = bundlesData?.filter((bundle) =>
    _.includes(_.toLower(bundle.name), searchText) // Make sure you're using the correct field for comparison
  );

  const indexOfLastBundle = currentPage * entriesPerPage;
  const indexOfFirstBundle = indexOfLastBundle - entriesPerPage;
  const currentBundles = filteredData?.slice(
    indexOfFirstBundle,
    indexOfLastBundle
  );
  const totalPages = Math.ceil(filteredData?.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (newEntries) => {
    setEntriesPerPage(newEntries);
    setCurrentPage(1);
  };

  const handleAddBundle = () => {
    navigate('/admin/add-bundle-plan');
  };

  const handleShowModal = (bundleId) => {
    setBundleIdToDelete(bundleId);
    setShowModal(true);
  };

  const handleDeleteBundle = async () => {
    if (bundleIdToDelete) {
      await deleteBundle(bundleIdToDelete);
      refetch(); // Refetch bundles after deletion
      setBundleIdToDelete(null);
    }
    setShowModal(false);
  };
const handleEditBundle=(bundle)=>{
  navigate('/admin/add-bundle-plan',{ state: bundle });
}
  const tableHeaders = ["Label", "Price", "Coins", "Actions"];
  const tableData = currentBundles?.map((bundle) => ({
    label: bundle.name,
    price: typeof bundle.price === 'number' ? `$${bundle.price.toFixed(2)}` : `$${parseFloat(bundle.price).toFixed(2)}`,
    coins: bundle.coins,
    actions: (
      <>
        <button
          className="btn btn-sm btn-outline-success me-2"
          onClick={() => handleEditBundle(bundle)} // Assume handleEditBundle is defined
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
    <div>
      <Searchbar
        heading="Manage Bundles"
        title="Add Bundle"
        placeholder="Search Bundles..."
        onClick={handleAddBundle}
        onSearch={handleSearchChange} // Pass the handleSearchChange function
      />

      <div className="manage-bundles text-light">
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
        title='Confirm Deletion'
        body='Are you sure you want to delete this bundle?'
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteBundle}
      />
    </div>
  );
};

export default ManageBundle;
