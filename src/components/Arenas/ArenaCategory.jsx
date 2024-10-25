import React from 'react';
import ArenaCard from './ArenaCard';
import './arenas.css';

const ArenaCategory = ({ title, arenas, handleJoin }) => (
  <div className="arena-category">
    <h4>{title}</h4>
    <div className="arena-list">
      {arenas.map((arena) => (
        <ArenaCard 
          key={arena.id} 
          arena={arena} 
          onJoin={() => handleJoin(arena)} // Trigger handleJoin when the "Join" button is clicked
        />
      ))}
    </div>
  </div>
);

export default ArenaCategory;
