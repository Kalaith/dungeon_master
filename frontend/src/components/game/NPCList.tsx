import React from "react";
import NPCCard from "./NPCCard";
import type { NPC } from "../../types/npc";

interface NPCListProps {
  npcs: NPC[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const NPCList: React.FC<NPCListProps> = ({ npcs, onSelect, selectedId }) => (
  <div className="flex flex-col gap-4">
    {npcs.map((npc) => (
      <NPCCard
        key={npc.id}
        npc={npc}
        onSelect={onSelect}
        selected={selectedId === npc.id}
      />
    ))}
  </div>
);

export default NPCList;
export type { NPC };
