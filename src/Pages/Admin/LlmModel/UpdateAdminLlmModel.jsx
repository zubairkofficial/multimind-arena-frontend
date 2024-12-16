import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Notyf } from "notyf";
import {
  useGetLlmModelByIdQuery,
  useUpdateLlmModelMutation,
} from "../../../features/api/llmModelApi";
import { ModelType } from "../../../common"; // Enum for model types
import { useGetAllLlmModelsQuery } from "../../../features/api/llmModelApi";

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  apiKey: yup.string().required("API Key is required"),
  modelType: yup
    .string()
    .oneOf(Object.values(ModelType), "Select a valid model type")
    .required("Model type is required"),
});

const UpdateAdminLlmModel = () => {
  const { id } = useParams(); // Get model ID from URL
  const navigate = useNavigate();
  const notyf = new Notyf();
  const { refetch:refetchAllLlmModel } = useGetAllLlmModelsQuery();

  // Fetch LLM model data
  const { data: llmModel, isLoading ,refetch:refetchLlmModelById} = useGetLlmModelByIdQuery(id);
  const [updateLlmModel, { isLoading: isUpdating }] = useUpdateLlmModelMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Populate form with existing LLM model data
  useEffect(() => {
    if (llmModel) {
      reset({
        name: llmModel.name,
        apiKey: llmModel.apiKey,
        modelType: llmModel.modelType,
      });
    }
  }, [llmModel, reset]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      console.log("Updating with data:", data);
      await updateLlmModel({ id, updatedModel: data }).unwrap(); // Align with the mutation's expected payload
      refetchAllLlmModel()
      refetchLlmModelById(id)
      notyf.success("LLM Model updated successfully!");
      navigate("/admin/llm-dashboard");
    } catch (err) {
      notyf.error("Failed to update LLM Model. Please try again.");
      console.error("Error updating LLM Model:", err);
    }
  };
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-3">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h5 className="mb-5">Update LLM Model</h5>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Enter model name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="text"
            id="apiKey"
            {...register("apiKey")}
            placeholder="Enter API key"
          />
          {errors.apiKey && <p className="error">{errors.apiKey.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="modelType">Model Type:</label>
          <select id="modelType" {...register("modelType")}>
            <option value="">Select Model Type</option>
            <option value="gpt-4o-mini">GPT-4o-mini</option>
            <option value="gpt-4o">GPT-4o</option>
            {/* Additional model types */}
          </select>
          {errors.modelType && <p className="error">{errors.modelType.message}</p>}
        </div>

        <button type="submit" className="submit-btn btn-default" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update LLM Model"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAdminLlmModel;
