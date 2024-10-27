import React from 'react';
import Slider from 'react-slick';
import ArenaCard from './ArenaCard';
import './arenas.css';

const ArenaCategory = ({ title, arenas, handleJoin }) => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Number of cards to show in a row
    slidesToScroll: 1,
    initialSlide: 0, // Start at the leftmost position
    centerMode: false, // Ensure cards are aligned to the left

    responsive: [
      {
        breakpoint: 1024, // Adjust the number of slides on tablet screens
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600, // Adjust the number of slides on mobile screens
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="arena-category">
      <h4>{title}</h4>
      <Slider {...settings} className="arena-slider">
        {arenas.map((arena) => (
          <div key={arena.id}>
            <ArenaCard 
              arena={arena} 
              onJoin={() => handleJoin(arena)} // Trigger handleJoin when the "Join" button is clicked
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ArenaCategory;
