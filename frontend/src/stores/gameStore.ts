import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NPC } from '../types/npc';
import type { Stats } from '../types/stats';
import { initialEvents, gameConfig } from '../utils/constants';

interface GameState {
  npcs: NPC[];
  selectedNPC: string | null;
  events: string[];
  location: string;
  stats: Stats | null;
}

interface GameActions {
  setNpcs: (npcs: NPC[]) => void;
  setSelectedNPC: (id: string | null) => void;
  setStats: (stats: Stats | null) => void;
  addEvent: (event: string) => void;
  setLocation: (location: string) => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
  persist(
    set => ({
      // State
      npcs: [],
      selectedNPC: null,
      events: [...initialEvents],
      location: gameConfig.INITIAL_LOCATION,
      stats: null,

      // Actions
      setNpcs: npcs => set({ npcs }),
      setSelectedNPC: selectedNPC => set({ selectedNPC }),
      setStats: stats => set({ stats }),
      addEvent: event =>
        set(state => ({
          events: [...state.events, event],
        })),
      setLocation: location => set({ location }),
    }),
    {
      name: 'game-storage',
      partialize: state => ({
        selectedNPC: state.selectedNPC,
        location: state.location,
        events: state.events,
      }),
    }
  )
);
