import React, { useState } from 'react';
import { useCreateCardMutation, useGetAllCardsQuery } from "../../../features/api/cardApi";
import { useLocation, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; // Import Notyf
import 'notyf/notyf.min.css'; // Import Notyf styles

export const theme = {
  primaryColor: '#4CAF50',
  secondaryColor: '#f3f3f3',
  textColor: '#333',
  errorColor: '#e74c3c',
  successColor: '#2ecc71',
  buttonHoverColor: '#45a049',
  inputBorderColor: '#ccc',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#4CAF50',
  shadowColor: 'rgba(0, 255, 0, 0.2)', 
};

const CreateCard = () => {
  const { state } = useLocation();
  const { coins, price } = state || {}; 
  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const { data: existingCards, refetch: refetchCards } = useGetAllCardsQuery(); 
  const [createCard, { isLoading, error, data, isSuccess }] = useCreateCardMutation(); 

  const notyf = new Notyf(); // Initialize Notyf

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...cardDetails,
        coins,
        price,
      };

      // Make the API call to create the card
      await createCard(payload).unwrap(); 

      // On success, show a success notification
      notyf.success("Card created successfully! Redirecting...");
      
      // Navigate to existing cards page and refetch the cards
      navigate("/existing-card");
      refetchCards(); // Refetch the list of cards

    } catch (err) {
      // Show error notification
      notyf.error("Failed to create the card. Please try again.");
      console.error('Failed to create card:', err);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <h1 style={styles.title}>Create Card</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="cardNumber" style={styles.label}>
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            style={styles.input}
            placeholder="Card Number"
            maxLength={16}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="expMonth" style={styles.label}>
            Expiry Month
          </label>
          <input
            type="text"
            id="expMonth"
            name="expMonth"
            value={cardDetails.expMonth}
            onChange={handleChange}
            style={styles.input}
            placeholder="MM"
            maxLength={2}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="expYear" style={styles.label}>
            Expiry Year
          </label>
          <input
            type="text"
            id="expYear"
            name="expYear"
            value={cardDetails.expYear}
            onChange={handleChange}
            style={styles.input}
            placeholder="YYYY"
            maxLength={4}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="cvc" style={styles.label}>
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={cardDetails.cvc}
            onChange={handleChange}
            style={styles.input}
            placeholder="CVC"
            maxLength={4}
            required
          />
        </div>

        {error && <p style={styles.error}>{error.message || 'Something went wrong'}</p>}
        {isSuccess && <p style={styles.success}>Card created successfully! Redirecting...</p>}

        <button type="submit" style={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Creating Card...' : 'Create Card'}
        </button>
      </form>
    </div>
  );
};

// Inline styles for the component with theme integration
const styles = {
  cardContainer: {
    padding: theme.padding,
    maxWidth: '450px',
    margin: '0 auto',
    borderRadius: theme.borderRadius,
    boxShadow: `0 4px 12px ${theme.shadowColor}`,
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '5px',
  },
  input: {
    padding: '12px',
    borderRadius: theme.borderRadius,
    border: `1px solid ${theme.inputBorderColor}`,
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  submitButton: {
    backgroundColor: theme.primaryColor,
    color: '#fff',
    padding: '14px 0',
    borderRadius: theme.borderRadius,
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: theme.errorColor,
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  success: {
    color: theme.successColor,
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
  },
};

export default CreateCard;
