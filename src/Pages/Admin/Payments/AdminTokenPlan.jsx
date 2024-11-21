import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import {
  useGetAllBundlesQuery,
  useAddBundleMutation,
  useUpdateBundleMutation,
} from "../../../features/api/bundleApi"; // Import the necessary hooks
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation for getting state
import Select from "react-select"; // Import react-select

const ManageBundlePlan = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to check for state
  const notyf = new Notyf();
  const { refetch } = useGetAllBundlesQuery(); // Get the refetch function
  const [addBundle] = useAddBundleMutation(); // Hook for adding a new bundle
  const [updateBundle] = useUpdateBundleMutation(); // Hook for updating a bundle

  // State for form inputs
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [coins, setCoins] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]); // State for the multi-select dropdown
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined options array
  const options = [
    { value: "arena_full_access", label: "Arena Full Access" },
    { value: "arena_limited_access", label: "Arena Limited Access" },
    { value: "basic_llm_model", label: "Basic LLM Model" },
    { value: "advanced_llm_model", label: "Advanced LLM Model" },
    { value: "priority_support", label: "Priority Support" },
    { value: "custom_integration", label: "Custom Integration" },
    { value: "analytics_dashboard", label: "Analytics Dashboard" },
  ];

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111111", // Dark gray background
      borderColor: "#333333", // Dark border
      color: "white",
      minHeight: "36px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#333333" : "#111111",
      color: state.isSelected ? "white" : "#bbb",
      "&:hover": {
        backgroundColor: "#222222",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#333333",
      color: "white",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#f44336",
      },
    }),
  };

  // Check if we are editing a bundle
  useEffect(() => {
    if (location.state) {
      const { name, price, coins, options } = location.state; // Assuming the options are part of the state
      setLabel(name);
      setPrice(price);
      setCoins(coins);
      setSelectedOptions(
        options.map((option) => ({ value: option, label: option }))
      ); // Set the selected options if editing
    }
  }, [location.state]);

  const handleAddBundle = async () => {
    if (!label || !price || !coins || selectedOptions.length === 0) {
      notyf.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const dataToSend = {
      name: label,
      price: parseFloat(price),
      coins: parseInt(coins, 10),
      options: selectedOptions.map((option) => option.value),
    };

    try {
      if (location.state) {
        await updateBundle({
          bundleId: location.state.id,
          updatedBundle: dataToSend,
        }).unwrap();
        notyf.success("Bundle updated successfully!");
      } else {
        await addBundle(dataToSend).unwrap();
        notyf.success("Bundle added successfully!");
      }

      setLabel("");
      setPrice("");
      setCoins("");
      setSelectedOptions([]);

      refetch(); // Trigger refetch of bundles
      navigate("/admin/manage-transactions"); // Navigate to the bundle list
    } catch (err) {
      notyf.error("Failed to add or update bundle.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="manage-bundle-plan-container"
      style={{ padding: "2rem", minWidth: "800px" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddBundle();
        }}
        className="bundle-form fs-6"
      >
        <h6 className="fs-5">
          {location.state ? "Edit Bundle" : "Add New Bundle"}
        </h6>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter Package Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
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
          <label>Options</label>
          <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            styles={customStyles}
            placeholder="Select Options"
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn-default btn-small"
            disabled={isSubmitting}
          >
            <span className="fs-5">
              {isSubmitting
                ? "Processing..."
                : location.state
                ? "Update Bundle"
                : "Add Bundle"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageBundlePlan;
