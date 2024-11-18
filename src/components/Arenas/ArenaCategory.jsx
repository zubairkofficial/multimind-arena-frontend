import React from 'react';
import Slider from 'react-slick';
import './ArenaCard.css';
import ArenaCard from './ArenaCard';


const ArenaCategory = ({ title, arenas, handleJoin }) => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,  // Ensure this is false to start from the left
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,  // Explicitly set to false on smaller screens
        },
      },
    ],
  };

  return (
    <div className="arena-category-container">
      <h4 className="arena-category-title">{title}</h4>
      <Slider {...settings} className="arena-slider">
        {arenas?.map((arena) => (
          <div key={arena.id} className="arena-card-container">
            <ArenaCard arena={arena} onJoin={() => handleJoin(arena)} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ArenaCategory;
