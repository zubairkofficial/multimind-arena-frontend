import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateLlmModelMutation,useGetAllLlmModelsQuery, } from '../../../features/api/llmModelApi'; // Import the mutation hook
import '../../../../public/assets/css/style.css';
import { ModelType } from '../../../common';
import { Notyf } from "notyf";

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  apiKey: yup.string().required('API Key is required'),
  modelType: yup.string()
    .oneOf(Object.values(ModelType), 'Select a valid model type')
    .required('Model type is required'),
});



const CreateAdminLlmModel = () => {
  
  // useForm hook for handling form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState('');  // Local state to handle API errors
  const [createLlmModel, { isLoading, error }] = useCreateLlmModelMutation(); // Destructure the mutation hook
  const {   refetch:getAllLlmModelRefetch } = useGetAllLlmModelsQuery();
  // Submit handler
  const onSubmit = async (data) => {
    const notyf = new Notyf();
    // Reset previous error message
    setErrorMessage('');

    try {
      // Call the mutation hook to create the new LLM model
      const result = await createLlmModel(data).unwrap();

      // If successful, reset the form
      if (result) {
        getAllLlmModelRefetch()
        notyf.success('LLM Model created successfully!')
        reset(); // Reset form fields after successful submission
      }
    } catch (err) {
      // Handle specific errors returned by the API
      console.error('Error creating LLM model:', err);
      setErrorMessage(err.data.message);
    }
  };

  return (
    <div className="container mx-3">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h5 className='mb-5'>Create LLM Model</h5>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Enter model name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="text"
            id="apiKey"
            {...register('apiKey')}
            placeholder="Enter API key"
          />
          {errors.apiKey && <p className="error">{errors.apiKey.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="modelType">Model Type:</label>
          <select id="modelType" {...register('modelType')}>
  <option value="">Select Model Type</option>
  <option value="gpt-3">GPT-3</option>
  <option value="gpt-4o">GPT-4o</option>
  <option value="llama3">LLaMA</option>
</select>

          {errors.modelType && <p className="error">{errors.modelType.message}</p>}
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}  {/* Display API error */}
        {error && <p className="error">Failed to create LLM Model: {error.message}</p>} {/* Display error from mutation */}

        <button type="submit" className="submit-btn btn-default" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create LLM Model'}
        </button>
      </form>
    </div>
  );
};

export default CreateAdminLlmModel;
