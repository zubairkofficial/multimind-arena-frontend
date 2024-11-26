import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Notyf } from "notyf";
import {
  useGetAllBundlesQuery,
  useAddBundleMutation,
  useUpdateBundleMutation,
} from "../../../features/api/bundleApi";
import { useGetAllLlmModelsQuery } from "../../../features/api/LlmModelApi";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select"; // Import Select from react-select

// Validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  coins: yup
    .number()
    .required("Coins are required")
    .positive("Coins must be positive")
    .integer("Coins must be an integer"),
  featureNames: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() }))
    .min(1, "At least one bundle Feature must be selected"),
  durationInDays: yup
    .number()
    .required("Duration is required")
    .positive("Duration must be positive")
    .integer("Duration must be an integer"),
});

const ManageBundlePlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notyf = new Notyf();

  const { refetch } = useGetAllBundlesQuery();
  const { data: getAllLlmModel } = useGetAllLlmModelsQuery();

  const [addBundle] = useAddBundleMutation();
  const [updateBundle] = useUpdateBundleMutation();

  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      coins: "",
      featureNames: [], // Default empty array for featureNames
      durationInDays: "", // Add default value for durationInDays
    },
  });

  // Prepare feature names for the select dropdown
  const featureNames = getAllLlmModel?.map((feature) => ({
    value: feature.id,
    label: feature.name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize and replace underscores
  }));

  // UseEffect to prepopulate the form when editing
  useEffect(() => {
    
      if (location.state) {
        const { name, price, coins, featureNames: selectedFeatureNames = [], durationInDays } = location.state;
        
        // Parse and format the featureNames from stringified JSON
        const formattedFeatures = selectedFeatureNames.map((opt) => {
          // Parse stringified JSON if needed
          const parsedOpt = typeof opt === 'string' ? JSON.parse(opt) : opt;
          return {
            value: parsedOpt.value,
            label: parsedOpt.label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
          };
        });
  
      reset({
        name,
        price,
        coins,
        featureNames: formattedFeatures, // Prepopulate formatted features
        durationInDays,
      });
    }
  }, [location.state, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("data?.featureNames",data?.featureNames)
    const bundleData = {
      name: data.name,
      price: parseFloat(data.price),
      coins: parseInt(data.coins, 10),
      featureNames: data?.featureNames||[],
      durationInDays: parseInt(data.durationInDays, 10), // Include durationInDays
    };

    try {
      if (location.state) {
        await updateBundle({
          bundleId: location.state.id,
          updatedBundle: bundleData,
        }).unwrap();
        notyf.success("Bundle updated successfully!");
      } else {
        await addBundle(bundleData).unwrap();
        notyf.success("Bundle added successfully!");
      }

      refetch();
      navigate("/admin/bundles");
    } catch (err) {
      notyf.error("Failed to add or update bundle.");
      console.error("Error:", err);
    }
  };

  // Custom styles for Select component to change background color to #101010
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#101010", // Dark background for the control
      borderColor: state.isFocused || state.menuIsOpen ? "#4caf50" : "#333333", // Green border when clicked (focus) or dropdown is open
      boxShadow:
        state.isFocused || state.menuIsOpen ? "0 0 0 2px #4caf50" : "none", // Optional: add green outline on focus
      color: "white", // Text color for the control
      minHeight: "36px",
      "&:hover": {
        borderColor: "#4caf50", // Ensures the border is black on hover as well
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#101010", // Background color for the dropdown menu
      color: "white", // Text color for the dropdown menu featureNames
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#333333" : "#101010", // Dark background for featureNames
      color: state.isSelected ? "white" : "#bbb", // Text color for selected and non-selected featureNames
      borderColor: "#4caf50",
      "&:hover": {
        backgroundColor: "#222222", // Hover effect color
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#4caf50", // Background color for selected values
      color: "white", // Text color for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // Text color for selected value label
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white", // Color for the remove button
      "&:hover": {
        backgroundColor: "#4caf50", // Hover color for remove button
      },
    }),
  };

  // Return JSX with added input field for durationInDays
  return (
    <div className="container mx-3">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h5 className="mb-5">
          {location.state ? "Edit Bundle" : "Add New Bundle"}
        </h5>

        {/* Name Field */}
        <div className="form-group mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Enter model name"
            className={` ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Price Field */}
        <div className="form-group mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            {...register("price")}
            placeholder="Enter price"
            className={` ${errors.price ? "is-invalid" : ""}`}
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        {/* Coins Field */}
        <div className="form-group mb-3">
          <label className="form-label">Coins:</label>
          <input
            type="number"
            id="coins"
            {...register("coins")}
            placeholder="Enter coins"
            className={` ${errors.coins ? "is-invalid" : ""}`}
          />
          {errors.coins && (
            <p className="text-danger">{errors.coins.message}</p>
          )}
        </div>

        {/* DurationInDays Field */}
        <div className="form-group mb-3">
          <label className="form-label">Duration (in Days):</label>
          <input
            type="number"
            id="durationInDays"
            {...register("durationInDays")}
            placeholder="Enter duration in days"
            className={` ${errors.durationInDays ? "is-invalid" : ""}`}
          />
          {errors.durationInDays && (
            <p className="text-danger">{errors.durationInDays.message}</p>
          )}
        </div>

        {/* Options Field */}
        <div className="form-group mb-3">
          <label className="form-label">Features:</label>
          <Controller
            name="featureNames"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={featureNames}
                styles={customStyles}
                placeholder="Select features"
              />
            )}
          />
          {errors.featureNames && (
            <p className="text-danger">{errors.featureNames.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="submit-btn btn-default"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processing..."
              : location.state
              ? "Update Bundle"
              : "Add Bundle"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageBundlePlan;
