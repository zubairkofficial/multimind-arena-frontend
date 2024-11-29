import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import ArenaCard from './ArenaCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Custom arrow components
const PrevArrow = ({ className, onClick }) => (
  <ArrowButton className={className} onClick={onClick} position="left">
    <FaChevronLeft />
  </ArrowButton>
);

const NextArrow = ({ className, onClick }) => (
  <ArrowButton className={className} onClick={onClick} position="right">
    <FaChevronRight />
  </ArrowButton>
);

const ArenaCategory = ({ title, arenas, handleJoin }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
        }
      }
    ]
  };

  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryTitle>{title}</CategoryTitle>
        <ViewAllButton>View All</ViewAllButton>
      </CategoryHeader>
      
      <SliderWrapper>
        <StyledSlider {...settings}>
          {arenas?.map((arena) => (
            <CardWrapper key={arena.id}>
              <ArenaCard arena={arena} onJoin={() => handleJoin(arena)} />
            </CardWrapper>
          ))}
        </StyledSlider>
      </SliderWrapper>
    </CategoryContainer>
  );
};

// Styled Components
const CategoryContainer = styled.section`
  padding: 2rem 0;
  background: rgba(16, 16, 16, 0.95);
  border-radius: 20px;
  margin: 1.5rem 0;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CategoryTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  position: relative;
  padding-left: 1rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: #17df14;
    border-radius: 2px;
  }
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: 1px solid #17df14;
  color: #17df14;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #17df14;
    color: #000000;
    transform: translateY(-2px);
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
  }

  .slick-slide {
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .slick-slide.slick-active {
    opacity: 1;
  }

  .slick-dots {
    bottom: -2rem;

    li button:before {
      color: #17df14;
    }

    li.slick-active button:before {
      color: #17df14;
    }
  }
`;

const CardWrapper = styled.div`
  padding: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  ${props => props.position}: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(10, 61, 12, 0.8);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: #17df14;
    color: #000000;
  }

  &.slick-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: rgba(10, 61, 12, 0.8);
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    ${props => props.position}: 0;
  }
`;

export default ArenaCategory;
