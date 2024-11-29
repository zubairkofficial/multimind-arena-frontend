import React, { useState } from "react";
import styled from 'styled-components';

const theme = {
  primary: '#17df14',
  secondary: '#0a3d0c',
  dark: '#101010',
  darker: '#000000',
  light: '#ffffff',
  success: 'rgba(76, 175, 80, 0.8)',
};

const Searchbar = ({
  heading,
  onClick,
  title,
  placeholder,
  onSearch,
  isPremium = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  return (
    <SearchbarContainer>
      <HeaderSection>
        <HeadingWrapper>
          <Heading>{heading}</Heading>
        </HeadingWrapper>

        <ButtonWrapper>
          {title && (
            <ActionButton onClick={onClick} disabled={isPremium}>
              {isPremium ? (
                <>
                  <i className="fas fa-lock" /> {title}
                </>
              ) : (
                title
              )}
            </ActionButton>
          )}
        </ButtonWrapper>
      </HeaderSection>

      <SearchSection>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
          />
          <SearchButton onClick={() => onSearch(searchQuery)}>
            <i className="fa fa-search" />
          </SearchButton>
        </SearchWrapper>
      </SearchSection>
    </SearchbarContainer>
  );
};

// Styled Components
const SearchbarContainer = styled.header`
  padding: 1.5rem;
  background: ${theme.dark};
  border-radius: 12px;
  border: 1px solid ${theme.secondary};
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeadingWrapper = styled.div`
  flex: 1;
`;

const Heading = styled.h6`
  color: ${theme.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${props => props.disabled ? theme.dark : theme.secondary};
  color: ${theme.light};
  border: 2px solid ${theme.secondary};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: ${theme.primary};
    color: ${theme.darker};
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    width: 100%;
    justify-content: center;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: stretch;
    width: 100%;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 300px;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3.5rem 1rem 1.2rem;
  background: ${theme.darker};
  border: 2px solid ${theme.secondary};
  border-radius: 12px;
  color: ${theme.light};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px rgba(23, 223, 20, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 3rem;
  background: ${theme.secondary};
  border: none;
  border-radius: 0 12px 12px 0;
  color: ${theme.light};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.primary};
    color: ${theme.darker};
  }

  i {
    font-size: 1.1rem;
  }
`;

export default Searchbar;
