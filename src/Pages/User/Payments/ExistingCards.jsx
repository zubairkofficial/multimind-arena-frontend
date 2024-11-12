import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAllCardsQuery, useSelectCardMutation } from "../../../features/api/cardApi";
import { Notyf } from 'notyf'; // Import Notyf
import 'notyf/notyf.min.css'; // Import Notyf styles
import styled from 'styled-components';

const ExistingCards = ({ onSelectCard }) => {
  const { state } = useLocation();
  const { coins, price } = state || {}; // Destructure coins and price from state

  const navigate = useNavigate();
  const { data: existingCards, isLoading: isCardsLoading, error } = useGetAllCardsQuery();
  const [selectCard] = useSelectCardMutation(); // use the selectCard mutation
  const notyf = new Notyf(); // Initialize Notyf

  // Loading state for the button
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (!isCardsLoading && existingCards?.length === 0) {
      navigate('/create-card', { state: { coins, price } });
    }
  }, [isCardsLoading, existingCards, navigate, coins, price]);

  const handleChooseCard = async (cardId) => {
    setIsSelecting(true); // Set loading state to true when selecting a card
    try {
      // Call the selectCard mutation with cardId, price, and coins
      await selectCard({ cardId, price, coins }).unwrap();
      notyf.success("Card payment successfully!"); // Show success notification
      navigate("/purchase"); // Navigate to the purchase page after success
    } catch (error) {
      notyf.error(error?.data?.message || "Error selecting card"); // Show error notification
      console.error("Error selecting card:", error);
    } finally {
      setIsSelecting(false); // Reset loading state once the operation is complete
    }
  };

  if (isCardsLoading) {
    return <p>Loading existing cards...</p>;
  }

  if (error) {
    console.error('Error fetching cards:', error);
    return <ErrorText>Failed to load cards</ErrorText>;
  }

  return (
    <div>
      <ButtonContainer>
        <button className="btn-default" onClick={() => navigate('/create-card', { state: { coins, price } })}>
          Add New Card
        </button>
      </ButtonContainer>
      <CardContainer>
        <HeaderContainer>
          <Title>Choose Existing Card</Title>
        </HeaderContainer>

        {/* Display coins and price */}
        <PriceInfo>
          <p className='mx-5'>Coins: {coins}</p>
          <p>Price: ${price}</p>
        </PriceInfo>

        <CardsList>
          {existingCards.map((card) => (
            <ExistingCard key={card.id}>
              <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
              <ChooseCardButton 
                onClick={() => handleChooseCard(card.id)}
                disabled={isSelecting} // Disable the button while loading
              >
                {isSelecting ? "Loading..." : "Choose this Card"}
              </ChooseCardButton>
            </ExistingCard>
          ))}
        </CardsList>
      </CardContainer>
    </div>
  );
};

// Styled-components for consistent styling
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const CardContainer = styled.div`
  padding: 20px;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 255, 0, 0.2);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExistingCard = styled.div`
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ChooseCardButton = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #b0b0b0; /* Light grey when disabled */
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;

const PriceInfo = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  text-align: center;
  color: #333;
  font-size: 16px;
`;

export default ExistingCards;
