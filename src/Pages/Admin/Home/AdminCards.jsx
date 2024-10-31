import React from 'react';
import { Link } from 'react-router-dom';

const AdminCards = ({ userCount,
  arenaTypesCount,arenaCount,
  aiFiguresCount}) => {

    const cardsData = [
      {
        title: 'Total Users',
        count: userCount,
        className: 'total-users-card',
        path: '/admin/users'
      },
      {
        title: 'Active Arenas',
        count: arenaCount,
        className: 'active-arenas-card',
          path: '/admin/manage-arenas'
      },
      {
        title: 'AI Figures',
        count: aiFiguresCount,
        className: 'ai-figures-card',
          path: '/admin/manage-ai-figures'
      },
      {
        title: 'Total Arena Types',
        count: arenaTypesCount,
        className: 'daily-active-users-card',
          path: '/admin/users'
      },
    ];
  return (
    <div className="row mb-4">
      {cardsData.map((card, index) => (
        <div className="col-md-3" key={index}>
          <Link to={card.path}>
          <div className={`admin-card card text-white ${card.className}`}>
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <h2 className="card-text">{card.count}</h2>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminCards;
