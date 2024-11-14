import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateArenaRequestMutation, useGetUserByIdQuery } from '../../../features/api/userApi'; // Import the query hook
import { ArenaRequestStatus } from '../../../common';

const StatusArena = () => {
  const user = useSelector((state) => state.user.user); // Get the current user from Redux
  const { data: userData, isLoading: userLoading, error: userError,refetch } = useGetUserByIdQuery(user.id);
 
  const [status, setStatus] = useState(userData?.createArenaRequestStatus || ArenaRequestStatus.STATUS);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Mutation hook for creating arena request
  const [createArenaRequest] = useCreateArenaRequestMutation();

  const handleRequestArena = async () => {
    setIsLoading(true);
    try {
      // Call the mutation to request arena access
      const response = await createArenaRequest(user.id).unwrap();
      setMessage(response.message || 'Request sent successfully!');
      refetch()
      setStatus(ArenaRequestStatus.PENDING);

    } catch (error) {
      setMessage('Error sending the request. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userError) {
      setMessage('Failed to load user data');
    }
  }, [userError]);

  const renderStatusContent = () => {
    if (userLoading) {
      return <div>Loading user data...</div>;  // Handle loading state for user data
    }

    if (userData.createArenaRequestStatus === ArenaRequestStatus.PENDING) {
      return (
        <div className="status-message">
          <h3>Your request is pending approval by the admin.</h3>
          <p>Once your request is approved, you will be able to create an arena.</p>
        </div>
      );
    }

    return (
      <div className="request-message">
        <h3>Request to Create Arena</h3>
        <p>Click the button below to send your request to the admin.</p>
        <button
          onClick={handleRequestArena}
          disabled={isLoading}
          className="btn-default"
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </button>
        {message && <p className="message-feedback">{message}</p>}
      </div>
    );
  };

  return (
    <div className="status-arena-container">
      <div className="status-arena-content">
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default StatusArena;
