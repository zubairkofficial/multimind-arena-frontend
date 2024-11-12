import React, { useState } from 'react';
import { coinPrice, coinsPerPackage } from '../../../common/index';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const theme = {
  primaryColor: '#4CAF50',
  secondaryColor: '#f3f3f3',
  textColor: '#333',
  buttonHoverColor: '#45a049',
  inputBorderColor: '#ccc',
  backgroundColor: '#f9f9f9',
  buttonDisabledColor: '#b0b0b0',
  borderRadius: '8px',
  padding: '20px',
};

const Purchase = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState('');

  const handlePurchase = () => {
    // Check if the number of coins is at least 1000
    if (coins < 1000) {
      setError('Minimum purchase is 1000 coins.');
      return;
    }

    const price = (coinPrice / coinsPerPackage) * coins;
    navigate('/existing-card', {
      state: { coins, price },
    });
  };

  return (
    <Container>
      <Title>Purchase Coins</Title>

      <CoinInfo>
        <CoinText>{coinsPerPackage} coins for ${coinPrice.toFixed(2)}</CoinText>

        <Input
          type="number"
          value={coins}
          onChange={(e) => {
            setCoins(e.target.value);
            setError(''); // Clear error when the user changes the value
          }}
          min="1000" // Enforce minimum 1000 coins in the input
          placeholder="Enter number of coins"
        />

        {error && <ErrorText>{error}</ErrorText>}

        <PurchaseButton onClick={handlePurchase} disabled={coins < 1000}>
          {coins < 1000 || coins <= 0 ? 'Enter at least 1000 coins' : `Purchase ${coins} Coins`}
        </PurchaseButton>
      </CoinInfo>
    </Container>
  );
};

// Styled-components for consistent styling
const Container = styled.div`
  padding: ${theme.padding};
  max-width: 400px;
  margin: 50px auto;
  background-color: ${theme.backgroundColor};
  border-radius: ${theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: ${theme.textColor};
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoinText = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${theme.textColor};
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid ${theme.inputBorderColor};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s ease;
`;

const PurchaseButton = styled.button`
  background-color: ${theme.primaryColor};
  color: #fff;
  padding: 12px 0;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.buttonHoverColor};
  }

  &:disabled {
    background-color: ${theme.buttonDisabledColor};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

export default Purchase;
