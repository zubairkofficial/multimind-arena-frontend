import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";
const AdminCards = ({ userCount,
  arenaTypesCount,arenaCount,
  aiFiguresCount}) => {

    const cardsData = [
      {
        title: "Total Users",
        count: userCount,
        className: "total-users-card",
        path: "/admin/users",
        userIcon: <FaUser />,
      },
      {
        title: "Active Arenas",
        count: arenaCount,
        className: "active-arenas-card",
        path: "/admin/manage-arenas",
        userIcon: <FaUserCheck />,
      },
      {
        title: "AI Figures",
        count: aiFiguresCount,
        className: "ai-figures-card",
        path: "/admin/manage-ai-figures",
        userIcon: <HiMiniCpuChip />,
      },
      {
        title: "Total Arena Types",
        count: arenaTypesCount,
        className: "daily-active-users-card",
        path: "/admin/users",
        userIcon: <FaUser />,
      },
    ];
  return (
    <div className="row mb-4">
      {cardsData.map((card, index) => (
        <div className="col-md-3" key={index}>
        <Link to={card.path}>
          {/* admin-card card*/}
          <div className={`text-white card-glass ${card.className}`}>
            {/* card-body */}
            <div className="card-body d-flex align-items-center">
              <div className="ls">
                {card.userIcon}
              </div>
              <div className="rs ms-3">
                <h5 className="card-title">{card.title}</h5>
                <h2 className="card-text text-center">{card.count}</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
      ))}
    </div>
  );
};

export default AdminCards;
