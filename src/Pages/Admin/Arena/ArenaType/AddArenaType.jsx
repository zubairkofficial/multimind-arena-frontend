import React from "react";
import { useAddArenaTypeMutation ,useGetAllArenaTypesQuery} from "../../../../features/api/arenaApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notyf } from "notyf";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Arena Type Name is required"),
  description: yup.string().required("Description is required"),
  prompt: yup.string().required("Prompt is required"),
});

const AddArenaType = () => {
  const [addArenaType,{isLoading,isArenaTypeLoading}] = useAddArenaTypeMutation();
    const { data: arenaTypesData, error, isLoading:arenaTypesLoading,refetch:arenaTypesRefech } = useGetAllArenaTypesQuery();
  
  const notyf = new Notyf();

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      prompt: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      await addArenaType(data).unwrap();
      arenaTypesRefech()
      notyf.success("Arena Type created successfully.");
      reset(); // Clear the form after submission
    } catch (error) {
      notyf.error("Failed to create Arena Type. Please try again.");
    }
  };

  return (
    <div className="ms-5 container">
      <h6 className="fs-5 mt-5 ms-4">Create New Arena Type</h6>
      <div
        className="tab-pane fade active show"
        id="arena-type"
        role="tabpanel"
        aria-labelledby="arena-type-tab"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rbt-profile-row rbt-default-form row row--15"
        >
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Arena Type Name
              </label>
              <input
                id="name"
                {...register("name")}
                style={{
                  borderColor: errors.name ? "red" : "", // Apply red border if there's an error
                  borderWidth: "1px", // Ensure the border is visible
                  outline: "none", // Remove default focus outline
                }}
                className={`text-light ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter Arena Type Name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className={`text-light ${errors.description ? "is-invalid" : ""}`}
                placeholder="Enter a description for the arena type"
                rows="2"
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
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
                className={`text-light ${errors.prompt ? "is-invalid" : ""}`}
                placeholder="Enter a prompt for the arena type"
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
               {isArenaTypeLoading||arenaTypesLoading?"Creating Arena Type...": "Create Arena Type"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArenaType;
