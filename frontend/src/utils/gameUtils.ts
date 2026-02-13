// Game-related utility functions
import { uiConfig } from "./constants";

/**
 * Get the color class for NPC mood based on mood value
 */
export const getMoodColor = (mood: number): string => {
  if (mood >= uiConfig.MOOD_THRESHOLDS.HIGH)
    return `bg-${uiConfig.COLORS.SUCCESS}-600`;
  if (mood >= uiConfig.MOOD_THRESHOLDS.MEDIUM)
    return `bg-${uiConfig.COLORS.WARNING}-500`;
  return `bg-${uiConfig.COLORS.ERROR}-600`;
};

/**
 * Get the color class for NPC portrait based on class
 */
export const getPortraitColor = (characterClass: string): string => {
  switch (characterClass) {
    case "fighter":
      return "bg-[#B4413C]";
    case "wizard":
      return "bg-[#1FB8CD]";
    case "rogue":
      return "bg-[#964325]";
    case "cleric":
      return "bg-[#5D878F]";
    case "archer":
      return "bg-[#944454]";
    default:
      return "bg-gray-400";
  }
};

/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Calculate percentage and ensure it's between 0 and 100
 */
export const calculatePercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return Math.min(100, Math.max(0, (current / max) * 100));
};
