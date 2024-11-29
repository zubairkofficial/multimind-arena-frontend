import React, { useState } from 'react';
import { coinPrice, coinsPerPackage } from '../../../common/index';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const theme = {
  primaryColor: '#0a3d0c',
  secondaryColor: '#101010',
  textColor: '#FFFFFF',
  lightTextColor: '#9CA3AF',
  backgroundColor: '#000000',
  buttonHoverColor: '#0d4e0f',
  inputBorderColor: '#1F1F1F',
  buttonDisabledColor: '#1F1F1F',
  cardBackgroundColor: '#101010',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const Purchase = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState('');

  const handlePurchase = () => {
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
    <PageWrapper>
      <Container>
        <CardHeader>
          <Title>Purchase Coins</Title>
          <Subtitle>Add credits to your account</Subtitle>
        </CardHeader>

        <CoinInfo>
          <PriceCard>
            <PriceLabel>Current Rate</PriceLabel>
            <PriceValue>{coinsPerPackage} coins</PriceValue>
            <PriceAmount>${coinPrice.toFixed(2)}</PriceAmount>
          </PriceCard>

          <InputWrapper>
            <InputLabel>Amount of coins</InputLabel>
            <Input
              type="number"
              value={coins}
              onChange={(e) => {
                setCoins(e.target.value);
                setError('');
              }}
              min="1000"
              placeholder="Enter number of coins (min. 1000)"
            />
            {error && <ErrorText>{error}</ErrorText>}
          </InputWrapper>

          {coins > 0 && !error && (
            <TotalAmount>
              Total: ${((coinPrice / coinsPerPackage) * coins).toFixed(2)}
            </TotalAmount>
          )}

          <PurchaseButton onClick={handlePurchase} disabled={coins < 1000}>
            {coins < 1000 || coins <= 0 ? (
              <>
                <i className="fas fa-coins"></i>
                Enter at least 1000 coins
              </>
            ) : (
              <>
                <i className="fas fa-shopping-cart"></i>
                Purchase {coins.toLocaleString()} Coins
              </>
            )}
          </PurchaseButton>
        </CoinInfo>
      </Container>
    </PageWrapper>
  );
};

// Updated styled-components
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.backgroundColor};
`;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  padding: ${theme.padding};
  background-color: ${theme.cardBackgroundColor};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  border: 1px solid ${theme.inputBorderColor};

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 10px;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.textColor};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${theme.lightTextColor};
  font-size: 16px;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PriceCard = styled.div`
  background-color: ${theme.backgroundColor};
  padding: 20px;
  border-radius: ${theme.borderRadius};
  text-align: center;
  border: 1px solid ${theme.inputBorderColor};
`;

const PriceLabel = styled.div`
  font-size: 14px;
  color: ${theme.lightTextColor};
  margin-bottom: 8px;
`;

const PriceValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.textColor};
  margin-bottom: 4px;
`;

const PriceAmount = styled.div`
  font-size: 20px;
  color: ${theme.primaryColor};
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: ${theme.lightTextColor};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${theme.inputBorderColor};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s ease;
  background-color: ${theme.backgroundColor};
  color: ${theme.textColor};

  &:focus {
    border-color: ${theme.primaryColor};
    box-shadow: 0 0 0 3px rgba(10, 61, 12, 0.2);
  }

  &::placeholder {
    color: ${theme.lightTextColor};
  }
`;

const PurchaseButton = styled.button`
  background-color: ${theme.primaryColor};
  color: white;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  i {
    font-size: 18px;
  }

  &:hover:not(:disabled) {
    background-color: ${theme.buttonHoverColor};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${theme.buttonDisabledColor};
    cursor: not-allowed;
    color: ${theme.lightTextColor};
  }
`;

const ErrorText = styled.p`
  color: #EF4444;
  font-size: 14px;
  margin-top: 4px;
`;

const TotalAmount = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.textColor};
  padding: 16px;
  background-color: ${theme.backgroundColor};
  border-radius: ${theme.borderRadius};
  border: 1px solid ${theme.inputBorderColor};
`;

export default Purchase;
