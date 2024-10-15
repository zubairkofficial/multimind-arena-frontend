import React from 'react'
import ArenaCard from './ArenaCard';
import './arenas.css'
const ArenaCategory = ({ title, arenas, cardSize = "small" , path }) => (
    <div className="arena-category">
      <h2>{title}</h2>
      <div className="arena-list">
        {arenas.map((arena) => (
          <ArenaCard key={arena.id} arena={arena} size={cardSize} path={path}/>
        ))}
      </div>
    </div>
  );

  export default ArenaCategory