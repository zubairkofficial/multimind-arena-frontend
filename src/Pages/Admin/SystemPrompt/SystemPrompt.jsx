import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAllSystemPromptsQuery,
  useUpdateSystemPromptMutation,
} from "../../../features/api/promptApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notyf } from "notyf";

// Validation schema using Yup
const schema = yup.object().shape({
  description: yup.string().required("System Prompt Description is required"),
  prompt: yup.string().required("Prompt is required"),
});

const UpdateSystemPrompt = () => {
  const { id } = useParams(); // Get the system prompt ID from the URL params
  const { data, error, isLoading } = useGetAllSystemPromptsQuery(); // Fetch the data
  const [updateSystemPrompt] = useUpdateSystemPromptMutation();
  const notyf = new Notyf();
  const navigate = useNavigate();

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      prompt: "",
    },
  });

  // Fetch the data and populate the form when the page loads
  useEffect(() => {
    if (data && id) {
      // Find the system prompt by id and populate the form
      const systemPrompt = data.find((item) => item.id === id);
      if (systemPrompt) {
        reset({
          description: systemPrompt.description,
          prompt: systemPrompt.prompt,
        });
      }
    }
  }, [data, id, reset]);

  // Form submission handler
  const onSubmit = async (formData) => {
    try {
      await updateSystemPrompt({
        id, // Pass the extracted id from params
        updatedSystemPrompt: formData,
      }).unwrap();
      notyf.success("System Prompt updated successfully.");
      navigate("/admin/manage-system-prompt"); // Redirect after successful update
    } catch (error) {
      notyf.error("Failed to update System Prompt. Please try again.");
    }
  };

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading system prompt data.</div>;
  }

  return (
    <div className="ms-5 container">
      <h6 className="fs-5 mt-5 ms-4">System Prompt</h6>
      <div
        className="tab-pane fade active show"
        id="system-prompt"
        role="tabpanel"
        aria-labelledby="system-prompt-tab"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rbt-profile-row rbt-default-form row row--15"
        >
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                System Prompt Description
              </label>
              <input
                id="description"
                {...register("description")}
                style={{
                  color: "#ccc",
                  borderColor: errors.description ? "red" : "", // Apply red border if there's an error
                  borderWidth: "1px", // Ensure the border is visible
                  outline: "none", // Remove default focus outline
                }}
                className={` ${errors.description ? "is-invalid" : ""}`}
                placeholder="Enter System Prompt Description"
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description.message}</div>
              )}
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label htmlFor="prompt" className="form-label">
                Prompt
              </label>
              <textarea
                id="prompt"
                {...register("prompt")}
                className={` ${errors.prompt ? "is-invalid" : ""}`}
                placeholder="Enter the prompt for the system"
                rows="4"
              ></textarea>
              {errors.prompt && (
                <div className="invalid-feedback">{errors.prompt.message}</div>
              )}
            </div>
          </div>

          <div className="col-12 mt-3">
            <div className="form-group mb-0 text-center">
              <button type="submit" className="btn-default btn-lg">
                Update System Prompt
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSystemPrompt;
