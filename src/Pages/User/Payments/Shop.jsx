import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

const Shop = () => {
  const navigate = useNavigate();

  const items = [
    { id: 1, label: 'Small Bundle - 100 Coins', cost: '$1.99', amount: 199 },
    { id: 2, label: 'Medium Bundle - 500 Coins', cost: '$7.99', amount: 799 },
    { id: 3, label: 'Large Bundle - 1000 Coins', cost: '$14.99', amount: 1499 },
    { id: 4, label: 'Mega Bundle - 5000 Coins', cost: '$59.99', amount: 5999 },
  ];

  const handlePurchase = async (item) => {
    const stripe = await stripePromise;
    const response = await axios.post('/create-checkout-session', {
    
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ item }),
    });

    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe Checkout
  };

  const CoinIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00ff00" />
      <path d="M9 12h6M10 10h4M10 14h4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div style={styles.shopContainer}>
      <h1 style={styles.title}>Shop</h1>
      <div style={styles.itemList}>
        {items.map(item => (
          <div key={item.id} style={styles.itemCard}>
            <CoinIcon />
            <h2 style={styles.itemLabel}>{item.label}</h2>
            <p style={styles.itemCost}>{item.cost}</p>
            <button style={styles.purchaseButton} onClick={() => handlePurchase(item)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  shopContainer: {
    
    color: '#00FF00',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  itemList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  itemCard: {
    backgroundColor: '#101010',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 255, 0, 0.2)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  itemCost: {
    fontSize: '1rem',
    marginTop: '5px',
    marginBottom: '15px',
  },
  purchaseButton: {
    backgroundColor: '#00FF00',
    color: '#000',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
};

export default Shop;
