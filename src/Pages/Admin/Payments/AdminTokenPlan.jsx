import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import { useGetAllBundlesQuery, useAddBundleMutation, useUpdateBundleMutation } from "../../../features/api/bundleApi"; // Import the necessary hooks
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation for getting state

const ManageBundlePlan = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to check for state
  const notyf = new Notyf();
  const { refetch } = useGetAllBundlesQuery(); // Get the refetch function
  const [addBundle] = useAddBundleMutation(); // Hook for adding a new bundle
  const [updateBundle] = useUpdateBundleMutation(); // Hook for updating a bundle

  // Define state for form inputs
  const [label, setLabel] = useState('');
  const [price, setPrice] = useState('');
  const [coins, setCoins] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if we are editing a bundle
  useEffect(() => {
    if (location.state) {
      const { name, price, coins } = location.state;
      setLabel(name);
      setPrice(price);
      setCoins(coins);
    }
  }, [location.state]);

  const handleAddBundle = async () => {
    // Validate input fields
    if (!label || !price || !coins) {
      notyf.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Create a payload that matches the desired JSON structure
    const dataToSend = {
      name: label,
      price: parseFloat(price),
      coins: parseInt(coins, 10),
    };

    try {
      // If we're editing a bundle, call updateBundle
      if (location.state) {
        await updateBundle({ bundleId: location.state.id, updatedBundle: dataToSend }).unwrap();
        notyf.success("Bundle updated successfully!");
      } else {
        // For adding a new bundle, use the addBundle mutation
        await addBundle(dataToSend).unwrap();
        notyf.success("Bundle added successfully!");
      }

      // Reset form after successful submission
      setLabel('');
      setPrice('');
      setCoins('');

      // Refetch the bundles after adding or updating
      refetch(); // This will trigger the refetch of the bundle list
      navigate("/admin/manage-transactions"); // Navigate back to the bundle list
    } catch (err) {
      notyf.error("Failed to add or update bundle.");
      console.error("Error:", err); // Log the error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="manage-bundle-plan-container" style={{ padding: "2rem", maxWidth: "800px" }}>
      <form onSubmit={(e) => { e.preventDefault(); handleAddBundle(); }} className="bundle-form fs-6">
        <h6 className="fs-5">Add New Bundle</h6>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Enter Package Name" required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01" // Allows decimal values
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Coins</label>
          <input
            type="number"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
            placeholder="Enter Coins"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn-default btn-small" disabled={isSubmitting}>
           <span className="fs-5"> {isSubmitting ? "Processing..." : (location.state ? "Update Bundle" : "Add Bundle")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageBundlePlan;
