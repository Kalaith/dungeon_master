import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GameBoard from "./components/layout/GameBoard";
import StorySection from "./components/layout/StorySection";
import StoryCard from "./components/layout/StoryCard";
import StoryContent from "./components/layout/StoryContent";
import StoryLocation from "./components/layout/StoryLocation";
import NPCPanel from "./components/layout/NPCPanel";
import NPCList from "./components/game/NPCList";
import { fetchNPCs } from "./api/npcs";
import { fetchStats } from "./api/stats";
import StatusMeters from "./components/game/StatusMeters";
import { useGameStore } from "./stores/gameStore";

const App: React.FC = () => {
  const {
    npcs,
    selectedNPC,
    events,
    location,
    stats,
    setNpcs,
    setSelectedNPC,
    setStats,
  } = useGameStore();

  useEffect(() => {
    fetchNPCs().then(setNpcs);
    fetchStats().then(setStats);
  }, [setNpcs, setStats]);

  const handleSelectNPC = (id: string) => setSelectedNPC(id);

  return (
    <div className="game-container">
      <Header />
      <GameBoard>
        <StorySection>
          <StoryCard>
            <div className="card__header">
              <h2>Current Story</h2>
              <StoryLocation location={location} />
            </div>
            <div className="card__body">
              <StoryContent events={events} />
            </div>
          </StoryCard>
        </StorySection>
        <div className="game-content grid grid-cols-1 md:grid-cols-2 gap-6">
          <NPCPanel>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold">Your Party</h3>
              </div>
              <div className="p-6">
                <NPCList
                  npcs={npcs}
                  onSelect={handleSelectNPC}
                  selectedId={selectedNPC}
                />
              </div>
            </div>
          </NPCPanel>
          {/* DMPanel and other controls would go here */}
        </div>
      </GameBoard>
      <Footer>
        {stats && (
          <StatusMeters
            tension={stats.tension}
            morale={stats.morale}
            gold={stats.gold}
            supplies={stats.supplies}
            reputation={stats.reputation}
          />
        )}
      </Footer>
    </div>
  );
};

export default App;
