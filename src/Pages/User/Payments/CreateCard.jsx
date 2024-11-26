import React, { useState } from 'react'; 
import { useCreateCardMutation, useGetAllCardsQuery } from "../../../features/api/cardApi";
import { useLocation, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf'; // Import Notyf
import 'notyf/notyf.min.css'; // Import Notyf styles
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../../features/api/userApi'; // Import the query hook
import { useCreateSubscriptionWithNewCardMutation } from "../../../features/api/subscriptionApi";

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
  const { coins, price,packageId } = state || {}; 
  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});
  
  const { data: existingCards, refetch: refetchCards } = useGetAllCardsQuery(); 
  const [createCard, { isLoading, error, data, isSuccess }] = useCreateCardMutation(); 
  const user = useSelector((state) => state.user.user);

  const userId = user?.id;
  const { data: userData, isError, refetch:userRefetch } = useGetUserByIdQuery(userId);
  const [createNewCardSubscription,{isLoading:isSubscription}] = useCreateSubscriptionWithNewCardMutation();

  const notyf = new Notyf(); // Initialize Notyf

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Card Number Validation (must be 16 digits)
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = 'Card number must be exactly 16 digits.';
    }

    // Expiry Month Validation (must be between 01 and 12)
    if (!/^(0[1-9]|1[0-2])$/.test(cardDetails.expMonth)) {
      newErrors.expMonth = 'Expiry month must be between 01 and 12.';
    }

    // Expiry Year Validation (must be a valid year, not in the past)
    if (!/^\d{4}$/.test(cardDetails.expYear) || parseInt(cardDetails.expYear) < new Date().getFullYear()) {
      newErrors.expYear = 'Please enter a valid 4 digits expiry year.';
    }

    // CVC Validation (must be 3 or 4 digits)
    if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form before submission
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // If there are validation errors, stop form submission
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
    
      const payload = {
        ...cardDetails,
        coins,
        price: Number(price),
      };
      if (packageId) {
        payload.packageId = packageId;
        await createNewCardSubscription(payload).unwrap()
      }else  {
        await createCard(payload).unwrap(); 
}
      // On success, show a success notification
      notyf.success("Card created successfully! Redirecting...");
      userRefetch()
      refetchCards(); // Refetch the list of cards
      // Navigate to existing cards page and refetch the cards
     setCardDetails( {
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
      })
      navigate("/dashboard");
      
    } catch (err) {
      // Show error notification
      const errorMessage = err?.data?.message?.message || "Failed to create the card. Please try again.";
      notyf.error(errorMessage);
  
      // Log error for debugging
      console.error("Failed to create card:", err);
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
          />
          {errors.cardNumber && <p style={styles.error}>{errors.cardNumber}</p>}
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
          />
          {errors.expMonth && <p style={styles.error}>{errors.expMonth}</p>}
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
          />
          {errors.expYear && <p style={styles.error}>{errors.expYear}</p>}
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
          />
          {errors.cvc && <p style={styles.error}>{errors.cvc}</p>}
        </div>

        {error && <p style={styles.error}>{error?.data?.message || 'Something went wrong'}</p>}
        {isSuccess && <p style={styles.success}>Card created successfully! Redirecting...</p>}

        <button type="submit" style={styles.submitButton} disabled={isLoading||isSubscription}>
          {isLoading || isSubscription ? 'Creating Card...' : 'Create Card'}
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
    color: '#fff',
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
