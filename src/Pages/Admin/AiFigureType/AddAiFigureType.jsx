import React, { useEffect } from "react";
import { useAddAifigureTypeMutation, useUpdateAifigureTypeMutation, useGetAllAifigureTypesQuery } from "../../../features/api/aiFigureTypeApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Notyf } from "notyf";
import { useLocation, useNavigate } from "react-router-dom";

// Validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("AI Figure Type Name is required"),
  description: yup.string().required("Description is required"),
});

const AddOrUpdateAifigureType = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const aifigureTypeData = location?.state; // Passed data for editing
  const [addAifigureType, { isLoading: isAddLoading }] = useAddAifigureTypeMutation();
  const [updateAifigureType, { isLoading: isUpdateLoading }] = useUpdateAifigureTypeMutation();
  // Use the hook correctly without destructuring the return value
const { data: aifigureTypesData, error, isLoading, refetch: refetchAllAifigureType } = useGetAllAifigureTypesQuery();

  const notyf = new Notyf();

  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (aifigureTypeData) {
      setValue("name", aifigureTypeData.name);
      setValue("description", aifigureTypeData.description);
    }
  }, [aifigureTypeData, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      if (aifigureTypeData) {
        await updateAifigureType({
          aifigureType: aifigureTypeData?.id,
          updatedAifigureType: data,
        }).unwrap();
        notyf.success("AI Figure Type updated successfully.");
      } else {
        await addAifigureType(data).unwrap();
        notyf.success("AI Figure Type created successfully.");
      }
      refetchAllAifigureType()

      navigate("/admin/manage-ai-figures-type"); // Redirect to manage page
      
      reset(); // Clear the form after submission
    } catch (error) {
      console.log("error", error);
      notyf.error(`${error.data.message}`);
    }
  };

  return (
    <div className="ms-5 container">
      <h6 className="fs-5 mt-5 ms-4">
        {aifigureTypeData ? "Update AI Figure Type" : "Create New AI Figure Type"}
      </h6>
      <div
        className="tab-pane fade active show"
        id="aifigure-type"
        role="tabpanel"
        aria-labelledby="aifigure-type-tab"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rbt-profile-row rbt-default-form row row--15"
        >
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                AI Figure Type Name
              </label>
              <input
                id="name"
                {...register("name")}
                style={{
                  borderColor: errors.name ? "red" : "",
                  borderWidth: "1px",
                  outline: "none",
                }}
                className={`text-light ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter AI Figure Type Name"
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
                placeholder="Enter a description for the AI Figure Type"
                rows="4"
              ></textarea>
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              )}
            </div>
          </div>

          <div className="col-12 mt-3">
            <div className="form-group mb-0 text-center">
              <button type="submit" className="btn-default btn-lg">
                {isAddLoading || isUpdateLoading
                  ? `${aifigureTypeData ? "Updating" : "Creating"} AI Figure Type...`
                  : `${aifigureTypeData ? "Update AI Figure Type" : "Create AI Figure Type"}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateAifigureType;
