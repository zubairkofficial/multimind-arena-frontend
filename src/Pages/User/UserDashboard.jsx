import React from "react";
import UserDashboard from "./Layout/Index";
import Searchbar from "../../components/Arenas/Searchbar";
import './../../components/Arenas/arenas.css'
import ArenaCategory from "../../components/Arenas/ArenaCategory";
export default function ArenaDashboard() {
  const popularArenas = [
    {
      id: 1,
      name: "Battle Royale",
      description: "By @GameMaster",
      image: "/placeholder.svg?height=100&width=100",
      participants: "1.2M players",
    },
    {
      id: 2,
      name: "Strategy Masters",
      description: "By @TacticalGenius",
      image: "/placeholder.svg?height=100&width=100",
      participants: "890K players",
    },
    {
      id: 3,
      name: "Puzzle Challenge",
      description: "By @BrainTeaser",
      image: "/placeholder.svg?height=100&width=100",
      participants: "567K players",
    },
    {
      id: 4,
      name: "Sci-Fi Showdown",
      description: "By @FutureWarrior",
      image: "/placeholder.svg?height=100&width=100",
      participants: "345K players",
    },
  ];

  const recommendedArenas = [
    {
      id: 5,
      name: "Practice Spellcasting",
      description: "with Wizard Academy",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Build an Empire",
      description: "with Empire Simulator",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "Solve Mysteries",
      description: "with Detective Agency",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "Explore Space",
      description: "with Galactic Explorer",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      name: "Master Martial Arts",
      description: "with Dojo Master",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      name: "Race to Victory",
      description: "with Speed Racer",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  const featuredArenas = [
    {
      id: 11,
      name: "Epic Quest",
      description: "Your journey begins here",
      image: "/placeholder.svg?height=150&width=150",
      participants: "2.5M players",
    },
    {
      id: 12,
      name: "Tactical Warfare",
      description: "Lead your army to victory",
      image: "/placeholder.svg?height=150&width=150",
      participants: "1.8M players",
    },
    {
      id: 13,
      name: "Mystic Realms",
      description: "Explore magical worlds",
      image: "/placeholder.svg?height=150&width=150",
      participants: "1.3M players",
    },
  ];

  return (
    <UserDashboard>
      <div className="arena-dashboard">
        <Searchbar />
        <ArenaCategory title="Popular Arenas" arenas={popularArenas} />
        <ArenaCategory title="Recommended for you" arenas={recommendedArenas} />
        <ArenaCategory
          title="Featured Arenas"
          arenas={featuredArenas}
          cardSize="large"
        />

        <style jsx>{`
          .arena-dashboard {
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-top: 60px; /* Add padding to move it down from the top */
          }

          .search-bar {
            display: flex;

            justify-content: center;
            background-color: #2a2a2a;
            border-radius: 20px;
            padding: 5px 15px;
          }

          .search-bar input {
            background: none;
            border: none;
            color: #ffffff;
            width: 200px;
          }

          .search-bar button {
            background: none;
            border: none;
            color: #ffffff;
            cursor: pointer;
          }

          .arena-category {
            margin-bottom: 30px;
          }

          .arena-category h2 {
            margin-bottom: 15px;
            font-size: 1.2em;
          }

          .arena-list {
            display: flex;
            overflow-x: auto;
            gap: 15px;
            padding-bottom: 10px;
          }

          .arena-card {
            background-color: #2a2a2a;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.2s;
          }

          .arena-card:hover {
            transform: translateY(-5px);
          }

          .arena-card.small {
            width: 200px;
          }

          .arena-card.large {
            width: 300px;
          }

          .arena-image {
            width: 100%;
            height: auto;
            object-fit: cover;
          }

          .arena-info {
            padding: 10px;
          }

          .arena-info h3 {
            margin: 0;
            font-size: 1em;
          }

          .arena-info p {
            margin: 5px 0;
            font-size: 0.8em;
            color: #aaaaaa;
          }

          .arena-stats {
            font-size: 0.8em;
            color: #aaaaaa;
          }

          /* Centering sidebar */
          .sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full height to ensure centering */
          }
        `}</style>
      </div>
    </UserDashboard>
  );
}
