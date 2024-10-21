import React from "react";
import { useNavigate } from "react-router-dom";
import ArenaCategory from "../../components/Arenas/ArenaCategory";
import "./../../components/Arenas/arenas.css";

export default function ArenaDashboard() {
  const navigate = useNavigate();

  const popularArenas = [
    {
      id: 1,
      name: "Battle Royale",
      description: "By @GameMaster",
      image: "/assets/images/anime-demo.png",
      participants: "1.2M members",
    },
    {
      id: 2,
      name: "Strategy Masters",
      description: "By @TacticalGenius",
      image: "/assets/images/anime-demo.png",
      participants: "890K members",
    },
    {
      id: 3,
      name: "Puzzle Challenge",
      description: "By @BrainTeaser",
      image: "/assets/images/anime-demo.png",
      participants: "567K members",
    },
    {
      id: 4,
      name: "Sci-Fi Showdown",
      description: "By @FutureWarrior",
      image: "/assets/images/anime-demo.png",
      participants: "345K members",
    },
  ];

  const recommendedArenas = [
    {
      id: 5,
      name: "Practice Spellcasting",
      description: "with Wizard Academy",
      image: "/assets/images/anime-demo.png",
    },
    {
      id: 6,
      name: "Build an Empire",
      description: "with Empire Simulator",
      image: "/assets/images/anime-demo.png",
    },
    {
      id: 7,
      name: "Solve Mysteries",
      description: "with Detective Agency",
      image: "/assets/images/anime-demo.png",
    },
    {
      id: 8,
      name: "Explore Space",
      description: "with Galactic Explorer",
      image: "/assets/images/anime-demo.png",
    },
    {
      id: 9,
      name: "Master Martial Arts",
      description: "with Dojo Master",
      image: "/assets/images/anime-demo.png",
    },
    {
      id: 10,
      name: "Race to Victory",
      description: "with Speed Racer",
      image: "/assets/images/anime-demo.png",
    },
  ];

  const featuredArenas = [
    {
      id: 11,
      name: "Epic Quest",
      description: "Your journey begins here",
      image: "/assets/images/anime-demo.png",
      participants: "2.5M members",
    },
    {
      id: 12,
      name: "Tactical Warfare",
      description: "Lead your army to victory",
      image: "/assets/images/anime-demo.png",
      participants: "1.8M members",
    },
    {
      id: 13,
      name: "Mystic Realms",
      description: "Explore magical worlds",
      image: "/assets/images/anime-demo.png",
      participants: "1.3M members",
    },
  ];

  const handleArenaClick = (id) => {
    navigate(`/arena-chat/${id}`);
  };

  return (
    <div className="container">
      <div className="arena-dashboard">
        <ArenaCategory
          title="Featured Arenas"
          arenas={featuredArenas}
          cardSize="large"
          handleClick={handleArenaClick}
        />
        <ArenaCategory
          title="Popular Arenas"
          arenas={popularArenas}
          handleClick={handleArenaClick}
        />
        <ArenaCategory
          title="Recommended for you"
          arenas={recommendedArenas}
          handleClick={handleArenaClick}
        />
      </div>
    </div>
  );
}
