import React from "react";
import UserDashboard from "./Layout/Index";
import Searchbar from "../../components/Arenas/Searchbar";
import "./../../components/Arenas/arenas.css";
import ArenaCategory from "../../components/Arenas/ArenaCategory";
export default function ArenaDashboard() {
  
  const popularArenas = [
    {
      id: 1,
      name: "Battle Royale",
      description: "By @GameMaster",
      image: "public/assets/images/anime-demo.webp",
      participants: "1.2M members",
      path: "/arena",
    },
    {
      id: 2,
      name: "Strategy Masters",
      description: "By @TacticalGenius",
      image: "public/assets/images/anime-demo.webp",
      participants: "890K members",
      path: "/arena",
    },
    {
      id: 3,
      name: "Puzzle Challenge",
      description: "By @BrainTeaser",
      image: "public/assets/images/anime-demo.webp",
      participants: "567K members",
    },
    {
      id: 4,
      name: "Sci-Fi Showdown",
      description: "By @FutureWarrior",
      image: "public/assets/images/anime-demo.webp",
      participants: "345K members",
      path: "/arena",
    },
  ];

  const recommendedArenas = [
    {
      id: 5,
      name: "Practice Spellcasting",
      description: "with Wizard Academy",
      image: "public/assets/images/anime-demo.webp",
    },
    {
      id: 6,
      name: "Build an Empire",
      description: "with Empire Simulator",
      image: "public/assets/images/anime-demo.webp",
    },
    {
      id: 7,
      name: "Solve Mysteries",
      description: "with Detective Agency",
      image: "public/assets/images/anime-demo.webp",
    },
    {
      id: 8,
      name: "Explore Space",
      description: "with Galactic Explorer",
      image: "public/assets/images/anime-demo.webp",
    },
    {
      id: 9,
      name: "Master Martial Arts",
      description: "with Dojo Master",
      image: "public/assets/images/anime-demo.webp",
    },
    {
      id: 10,
      name: "Race to Victory",
      description: "with Speed Racer",
      image: "public/assets/images/anime-demo.webp",
    },
  ];

  const featuredArenas = [
    {
      id: 11,
      name: "Epic Quest",
      description: "Your journey begins here",
      image: "public/assets/images/anime-demo.webp",
      participants: "2.5M members",
      path: "/arena",
    },
    {
      id: 12,
      name: "Tactical Warfare",
      description: "Lead your army to victory",
      image: "public/assets/images/anime-demo.webp",
      participants: "1.8M members",
      path: "/arena",
    },
    {
      id: 13,
      name: "Mystic Realms",
      description: "Explore magical worlds",
      image: "public/assets/images/anime-demo.webp",
      participants: "1.3M members",
      path: "/arena",
    },
  ];

  return (
    <UserDashboard>
      <div className="arena-dashboard" style={{ backgroundColor: "#000000" }}>
      <Searchbar />
        <ArenaCategory
          title="Featured Arenas"
          arenas={featuredArenas}
          cardSize="large"
          path={featuredArenas.path}
        />
                <ArenaCategory title="Popular Arenas" arenas={popularArenas} />
                <ArenaCategory title="Recommended for you" arenas={recommendedArenas} />
      </div>

   
    </UserDashboard>
  );
}
