// Game configuration constants

export const GAME_CONFIG = {
  MAX_LEVEL: 100,
  BASE_EXPERIENCE: 1000,
  LEVEL_MULTIPLIER: 1.5,
  GOLD_PER_LEVEL: 250,
  INITIAL_LOCATION: 'The Prancing Pony Tavern',
} as const;

export const INITIAL_EVENTS = [
  'Your adventuring party has gathered at the Prancing Pony Tavern to plan their next adventure. The fire crackles warmly as your companions discuss potential quests and share their thoughts on what lies ahead...'
] as const;

export const UI_CONFIG = {
  MOOD_THRESHOLDS: {
    HIGH: 70,
    MEDIUM: 40,
  },
  COLORS: {
    PRIMARY: 'primary',
    SUCCESS: 'emerald',
    WARNING: 'yellow',
    ERROR: 'red',
  }
} as const;
