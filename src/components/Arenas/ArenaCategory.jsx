import React from 'react';
import ArenaCard from './ArenaCard';
import './arenas.css';

const ArenaCategory = ({ title, arenas, cardSize = "small", handleClick }) => (
  <div className="arena-category">
    <h4>{title}</h4>
    <div className="arena-list">
      {arenas.map((arena) => (
        <ArenaCard 
          key={arena.id} 
          arena={arena} 
          size={cardSize} 
          onClick={() => handleClick(arena.id)} // Trigger handleClick with the correct ID
        />
      ))}
    </div>
  </div>
);

export default ArenaCategory;
