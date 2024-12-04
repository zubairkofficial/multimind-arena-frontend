import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateUserMutation ,useGetAllUsersQuery} from '../../../features/api/userApi'; // Import the hook
import { FaUpload, FaImage } from 'react-icons/fa';
import styled from 'styled-components';

const UpdateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #282c34;
  border-radius: 12px;
  color: #fff;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 8px;
  background: #333;
  color: #fff;
`;

const ImageSection = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px dashed rgba(76, 175, 80, 0.2);
`;

const ImagePreview = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  color: #4caf50;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(76, 175, 80, 0.2);
  }

  input {
    display: none;
  }
`;

const NoImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #4caf50;
    color: #fff;

    &:hover {
      background: #45a049;
    }
  }

  &.secondary {
    background: #607d8b;
    color: #fff;

    &:hover {
      background: #546e7a;
    }
  }
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;

  &.success {
    background: #4caf50;
    color: #fff;
  }

  &.error {
    background: #f44336;
    color: #fff;
  }
`;

const UpdateAdminUsers = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user data from location state
  const user = location.state || {}; // If location.state is empty, fallback to empty object

  // State to store the form data
  const [formData, setFormData] = useState({
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    isActive: user.isActive || false,
    isAdmin: user.isAdmin || false,
    tier: user.tier || 'FREE',
    availableCoins: user?.availableCoins || 100,
    createArenaRequestStatus: user.createArenaRequestStatus || 'STATUS',
    aiFigureRequestStatus: user.aiFigureRequestStatus || 'IN_PROGRESS',
    image: user.image || '',
  });
  // Get the updateUser mutation hook
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const { refetch:userRefetch, data: allUsers, error: userError, isLoading: isLoadingUsers } = useGetAllUsersQuery();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUser(formData).unwrap(); // Trigger the mutation and handle the response
      userRefetch()
      navigate('/admin/users'); // Redirect to users list or another page
    } catch (err) {
      console.error('Error updating user:', err);
      // Optionally, display error message to the user
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.value
    }));
  };

  return (
    <UpdateContainer>
      <PageTitle>
        <i className="fas fa-user-edit"></i> Update User
      </PageTitle>
      
      <FormContainer onSubmit={handleSubmit}>
        <FormGrid>
          {/* Name Field */}
          <div>
            <Label>Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username Field */}
          <div>
            <Label>Username:</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* User Tier */}
          <div>
            <Label>Tier:</Label>
            <select
              name="tier"
              value={formData.tier}
              onChange={handleChange}
            >
              <option value="FREE">Free</option>
              <option value="PREMIUM">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          {/* Available Coins */}
          <div>
            <Label>Available Coins:</Label>
            <Input
              type="number"
              name="availableCoins"
              value={formData?.availableCoins}
              onChange={handleChange}
            />
          </div>

          {/* Arena Request Status */}
          <div>
            <Label>Create Arena Request Status:</Label>
            <select
              name="createArenaRequestStatus"
              value={formData.createArenaRequestStatus}
              onChange={handleChange}
            >
              <option value="STATUS">Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* AI Figure Request Status */}
          <div>
            <Label>AI Figure Request Status:</Label>
            <select
              name="aiFigureRequestStatus"
              value={formData.aiFigureRequestStatus}
              onChange={handleChange}
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <ImageSection>
            <Label>User Image</Label>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              {formData.image ? (
                <ImagePreview>
                  <img 
                    src={formData?.image} 
                    alt="User"
                    onError={(e) => {
                      e.target.onerror = null;
                      setFormData(prev => ({
                        ...prev,
                        image: ''
                      }));
                    }}
                  />
                  <ImageOverlay className="overlay">
                    <UploadButton>
                      <FaUpload />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </UploadButton>
                  </ImageOverlay>
                </ImagePreview>
              ) : (
                <NoImage>
                  <FaImage />
                </NoImage>
              )}
              
              <div style={{ flex: 1 }}>
                <FormGroup>
                  <Label>Image URL</Label>
                  <Input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleImageUrlChange}
                    placeholder="Enter image URL or upload an image"
                  />
                </FormGroup>
                <div style={{ marginTop: '0.5rem' }}>
                  <UploadButton>
                    <FaUpload /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </UploadButton>
                </div>
              </div>
            </div>
          </ImageSection>
        </FormGrid>

        <ButtonContainer>
          <Button 
            type="button" 
            className="secondary"
            onClick={() => navigate('/admin/users')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update User'}
          </Button>
        </ButtonContainer>

        {isSuccess && (
          <StatusMessage className="success">
            User updated successfully!
          </StatusMessage>
        )}
        {isError && (
          <StatusMessage className="error">
            Error updating user: {error.message}
          </StatusMessage>
        )}
      </FormContainer>
    </UpdateContainer>
  );
};

export default UpdateAdminUsers;
