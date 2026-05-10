import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { webhatcheryGameApi, type WebHatcheryGameState } from '../api/webhatcheryGameApi';
import type { NPC } from '../types/npc';
import type { Stats } from '../types/stats';
import { useWebHatcherySessionStore } from './webhatcherySessionStore';

interface GameState {
  npcs: NPC[];
  selectedNPC: string | null;
  events: string[];
  location: string;
  stats: Stats | null;
  isLoading: boolean;
  error: string | null;
}

interface GameActions {
  initializeBackend: () => Promise<void>;
  setNpcs: (npcs: NPC[]) => void;
  setSelectedNPC: (id: string | null) => Promise<void>;
  setStats: (stats: Stats | null) => void;
  addEvent: (event: string) => Promise<void>;
  setLocation: (location: string) => Promise<void>;
}

type GameStore = GameState & GameActions;

interface DungeonMasterBackendState {
  npcs?: NPC[];
  selectedNPC?: string | null;
  events?: string[];
  location?: string;
  stats?: Stats;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toBackendState = (game: WebHatcheryGameState): DungeonMasterBackendState => {
  const state = game.save.state;
  return isRecord(state) ? (state as DungeonMasterBackendState) : {};
};

const applyBackendGame = (set: (state: Partial<GameStore>) => void, game: WebHatcheryGameState): void => {
  const state = toBackendState(game);
  set({
    npcs: Array.isArray(state.npcs) ? state.npcs : [],
    selectedNPC: typeof state.selectedNPC === 'string' ? state.selectedNPC : null,
    events: Array.isArray(state.events) ? state.events.filter((event): event is string => typeof event === 'string') : [],
    location: typeof state.location === 'string' ? state.location : '',
    stats: state.stats ?? null,
    isLoading: false,
    error: null,
  });
};

const loadBackendGame = async (): Promise<WebHatcheryGameState> => {
  const session = useWebHatcherySessionStore.getState();
  try {
    return await session.loadGame();
  } catch {
    return await session.continueAsGuest();
  }
};

export const useGameStore = create<GameStore>()(
  persist(
    set => ({
      // State
      npcs: [],
      selectedNPC: null,
      events: [],
      location: '',
      stats: null,
      isLoading: false,
      error: null,

      // Actions
      initializeBackend: async () => {
        set({ isLoading: true, error: null });
        try {
          applyBackendGame(set, await loadBackendGame());
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to initialize game.';
          set({ isLoading: false, error: message });
        }
      },
      setNpcs: npcs => set({ npcs }),
      setSelectedNPC: async selectedNPC => {
        set({ isLoading: true, error: null });
        try {
          applyBackendGame(set, await webhatcheryGameApi.applyIntent('select_npc', { id: selectedNPC }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to select NPC.';
          set({ isLoading: false, error: message });
        }
      },
      setStats: stats => set({ stats }),
      addEvent: async event => {
        set({ isLoading: true, error: null });
        try {
          applyBackendGame(set, await webhatcheryGameApi.applyIntent('add_event', { event }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to add story event.';
          set({ isLoading: false, error: message });
        }
      },
      setLocation: async location => {
        set({ isLoading: true, error: null });
        try {
          applyBackendGame(set, await webhatcheryGameApi.applyIntent('set_location', { location }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to set location.';
          set({ isLoading: false, error: message });
        }
      },
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
